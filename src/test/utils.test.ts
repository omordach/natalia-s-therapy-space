import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins and filters class names", () => {
    const hidden = false;
    expect(cn("a", hidden && "b", undefined, "c")).toBe("a c");
  });

  it.each([
    // Tailwind 4 class names: the later class must win over the earlier conflicting one.
    [["bg-linear-to-b", "bg-linear-to-t"], "bg-linear-to-t"],
    [["outline-hidden", "outline-2"], "outline-hidden outline-2"],
    [["shadow-xs", "shadow-lg"], "shadow-lg"],
    [["rounded-xs", "rounded-md"], "rounded-md"],
    [["z-100", "z-10"], "z-10"],
    [["translate-x-(--x)", "translate-x-0"], "translate-x-0"],
    [["px-4 py-3", "p-8"], "p-8"],
  ])("merges %j into %s", (input, expected) => {
    expect(cn(...input)).toBe(expected);
  });
});
