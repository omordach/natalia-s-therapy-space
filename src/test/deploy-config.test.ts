import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "smol-toml";

const root = resolve(__dirname, "../..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

const netlify = parse(read("netlify.toml")) as {
  build: { environment?: { NODE_VERSION?: string } };
  headers?: { for: string; values: Record<string, string> }[];
};
const headersFor = (path: string) => netlify.headers?.find((h) => h.for === path)?.values ?? {};
const pkg = JSON.parse(read("package.json"));
const ciMatrix = read(".github/workflows/health-check.yml").match(/node-version:\s*\[([^\]]+)\]/)?.[1];

// Node.js LTS lines that still receive security updates.
const SUPPORTED_NODE_MAJORS = [22, 24];

describe("Node.js version", () => {
  const netlifyMajor = Number(netlify.build.environment?.NODE_VERSION);
  const ciMajor = Number(ciMatrix?.trim().split(".")[0]);
  const enginesMajor = Number(pkg.engines?.node?.match(/\d+/)?.[0]);

  it("Netlify builds on a supported LTS", () => {
    expect(SUPPORTED_NODE_MAJORS).toContain(netlifyMajor);
  });

  it("CI, Netlify and package.json engines use the same major", () => {
    expect(ciMajor).toBe(netlifyMajor);
    expect(enginesMajor).toBe(netlifyMajor);
  });
});

describe("Netlify response headers", () => {
  it("sets baseline security headers on every page", () => {
    expect(headersFor("/*")).toMatchObject({
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    expect(headersFor("/*")["Permissions-Policy"]).toMatch(/camera=\(\)/);
  });

  it("caches fingerprinted build assets immutably", () => {
    expect(headersFor("/assets/*")["Cache-Control"]).toBe("public, max-age=31536000, immutable");
  });
});

describe("Content-Security-Policy", () => {
  const csp = headersFor("/*")["Content-Security-Policy"] ?? "";
  const directives = Object.fromEntries(
    csp
      .split(";")
      .map((d) => d.trim().split(/\s+/))
      .filter(([name]) => name)
      .map(([name, ...values]) => [name, values]),
  );

  it("is set on every page with a restrictive default", () => {
    expect(directives["default-src"]).toEqual(["'self'"]);
    expect(directives["object-src"]).toEqual(["'none'"]);
    expect(directives["base-uri"]).toEqual(["'self'"]);
    expect(directives["frame-ancestors"]).toEqual(["'none'"]);
    expect(directives["form-action"]).toEqual(["'self'"]);
  });

  it("does not allow inline or eval'd scripts", () => {
    expect(directives["script-src"]).toBeDefined();
    expect(directives["script-src"]).not.toContain("'unsafe-inline'");
    expect(directives["script-src"]).not.toContain("'unsafe-eval'");
  });
});

describe("/.well-known/ on Netlify", () => {
  const redirects = (parse(read("netlify.toml")) as {
    redirects: { from: string; to: string; status?: number; force?: boolean }[];
  }).redirects;
  const wellKnown = redirects.findIndex((r) => r.from === "/.well-known/*");
  const spaFallback = redirects.findIndex((r) => r.from === "/*");

  // Without this, the SPA fallback answers e.g. /.well-known/ai-catalog.json with index.html (200),
  // which agents and Lighthouse's ARD audit then fail to parse as JSON.
  it("answers missing files with 404 before the SPA fallback", () => {
    expect(wellKnown).toBeGreaterThanOrEqual(0);
    expect(wellKnown).toBeLessThan(spaFallback);
    expect(redirects[wellKnown].status).toBe(404);
  });

  it("still serves files that exist there (rule is not forced)", () => {
    expect(redirects[wellKnown].force ?? false).toBe(false);
  });
});
