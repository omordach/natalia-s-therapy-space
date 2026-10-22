import { describe, expect, it } from "vitest";
import pl from "@/locales/pl.json";
import uk from "@/locales/uk.json";

function flatten(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  return Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flatten(value as Record<string, unknown>, path));
    } else {
      acc[path] = value;
    }
    return acc;
  }, {});
}

const plFlat = flatten(pl);
const ukFlat = flatten(uk);

describe("locale files", () => {
  it("pl and uk define the same keys", () => {
    expect(Object.keys(ukFlat).sort()).toEqual(Object.keys(plFlat).sort());
  });

  it.each([
    ["pl", plFlat],
    ["uk", ukFlat],
  ])("%s has only non-empty string values", (_, flat) => {
    for (const [key, value] of Object.entries(flat)) {
      expect(typeof value, key).toBe("string");
      expect((value as string).trim(), key).not.toBe("");
    }
  });
});
