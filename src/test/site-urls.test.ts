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
