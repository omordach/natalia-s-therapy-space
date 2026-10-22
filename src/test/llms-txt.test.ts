import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "../..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

// Mirrors Lighthouse's "llms.txt follows recommendations" audit (Agentic Browsing category).
describe("public/llms.txt", () => {
  const llms = read("public/llms.txt");
  const withoutMarkdownLinks = llms.replace(/\[[^\]]*\]\([^)]*\)/g, "");

  it("starts with an H1 and has real content", () => {
    expect(llms.trimStart()).toMatch(/^# \S/);
    expect(llms.length).toBeGreaterThan(50);
  });

  it("uses Markdown link syntax", () => {
    expect(llms).toMatch(/\[[^\]]+\]\(https?:\/\/[^)]+\)/);
  });

  it("has no bare URLs outside Markdown links", () => {
    expect(withoutMarkdownLinks.match(/https?:\/\/\S+/g) ?? []).toEqual([]);
  });
});
