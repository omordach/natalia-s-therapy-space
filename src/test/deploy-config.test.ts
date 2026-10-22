import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "smol-toml";

const root = resolve(__dirname, "../..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

const netlify = parse(read("netlify.toml")) as {
  build: { environment?: { NODE_VERSION?: string } };
};
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
