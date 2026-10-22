import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(__dirname, "../..");
const src = resolve(root, "src");

function filesIn(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? filesIn(full) : [full];
  });
}

const importPattern = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(?\s*['"]([^'"]+)['"]/g;

function specifiers(file: string) {
  return [...readFileSync(file, "utf8").matchAll(importPattern)].map((m) => m[1] ?? m[2]);
}

function resolveLocal(from: string, spec: string) {
  const base = spec.startsWith("@/") ? join(src, spec.slice(2)) : resolve(dirname(from), spec);
  const candidates = [base, ...[".ts", ".tsx", ".json", "/index.ts", "/index.tsx"].map((ext) => base + ext)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const isLocal = (spec: string) => spec.startsWith(".") || spec.startsWith("@/");
const packageName = (spec: string) => spec.split("/").slice(0, spec.startsWith("@") ? 2 : 1).join("/");

// Walk the import graph from the app entry and the tests.
const entries = [resolve(src, "main.tsx"), ...filesIn(resolve(src, "test"))];
const reachable = new Set<string>();
const packagesUsed = new Set<string>();
const queue = [...entries];
while (queue.length) {
  const file = queue.pop()!;
  if (reachable.has(file)) continue;
  reachable.add(file);
  if (!/\.(ts|tsx)$/.test(file)) continue;
  for (const spec of specifiers(file)) {
    if (isLocal(spec)) {
      const target = resolveLocal(file, spec);
      if (target) queue.push(target);
    } else {
      packagesUsed.add(packageName(spec));
    }
  }
}

describe("dead code", () => {
  it("every source file is reachable from main.tsx or a test", () => {
    const unreachable = filesIn(src)
      .filter((f) => /\.(ts|tsx)$/.test(f) && !f.endsWith(".d.ts") && !reachable.has(f))
      .map((f) => relative(root, f));
    expect(unreachable).toEqual([]);
  });

  it("every runtime dependency is imported by the app", () => {
    const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
    const tailwindConfig = readFileSync(resolve(root, "tailwind.config.ts"), "utf8");
    const unused = Object.keys(pkg.dependencies ?? {}).filter(
      (dep) => !packagesUsed.has(dep) && !tailwindConfig.includes(`"${dep}"`) && !tailwindConfig.includes(`'${dep}'`),
    );
    expect(unused).toEqual([]);
  });
});
