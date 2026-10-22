import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(__dirname, "../..");
const publicDir = resolve(root, "public");

function filesIn(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? filesIn(full) : [full];
  });
}

const sources = [
  resolve(root, "index.html"),
  ...filesIn(publicDir).filter((f) => /\.(html|json|txt|md|xml)$/.test(f)),
];

const ownUrls = sources.flatMap((file) =>
  [...readFileSync(file, "utf8").matchAll(/https:\/\/nataliarainyk\.com(\/[^\s"'<>)]*)?/g)].map((m) => ({
    file: file.replace(`${root}/`, ""),
    path: m[1] ?? "/",
  })),
);

describe("absolute URLs on nataliarainyk.com", () => {
  it("are found in the site metadata", () => {
    expect(ownUrls.length).toBeGreaterThan(0);
  });

  // Hashed /assets/* names change on every build, and the SPA fallback serves index.html
  // for missing files, so a stale URL still returns 200 — but with HTML instead of an image.
  it.each(ownUrls.filter((u) => u.path !== "/").map((u) => [u.path, u.file]))(
    "%s (in %s) is a stable file from public/",
    (path) => {
      expect(path).not.toMatch(/^\/assets\//);
      expect(existsSync(join(publicDir, path)), `public${path}`).toBe(true);
    },
  );
});

describe("local links in index.html", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  const localRefs = [...html.matchAll(/<(?:link|meta|img)\b[^>]*\b(?:href|src|content)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((ref) => /^\/?[\w.-]+(\/[\w.-]+)*\.(png|ico|svg|jpe?g|webp|json|txt|xml|webmanifest)$/.test(ref));

  it("are found", () => {
    expect(localRefs.length).toBeGreaterThan(0);
  });

  // Vite leaves these untouched, so they must be absolute paths to files in public/.
  it.each(localRefs)("%s is a root-absolute path to a file in public/", (ref) => {
    expect(ref.startsWith("/"), "root-absolute").toBe(true);
    expect(existsSync(join(publicDir, ref)), `public/${ref}`).toBe(true);
  });
});
