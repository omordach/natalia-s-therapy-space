import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "../..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

function fieldNames(html: string) {
  return [...html.matchAll(/<(?:input|textarea)[^>]*\bname="([^"]+)"/g)].map((m) => m[1]);
}

describe("Netlify Forms detection form", () => {
  it("index.html declares every field the contact form submits", () => {
    const hidden = read("index.html").match(/<form name="contact"[\s\S]*?<\/form>/)?.[0];
    expect(hidden, "hidden contact form in index.html").toBeTruthy();
    expect(hidden).toMatch(/netlify-honeypot="bot-field"/);

    const netlifyMeta = new Set(["form-name", "bot-field"]);
    const componentFields = fieldNames(read("src/components/Contact.tsx")).filter((n) => !netlifyMeta.has(n));
    expect(componentFields.length).toBeGreaterThan(0);
    expect(fieldNames(hidden!).sort()).toEqual([...componentFields].sort());
  });
});
