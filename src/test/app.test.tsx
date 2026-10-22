import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("App routing", () => {
  // React Router warns once per module instance, so this must be the first render in the file.
  it("is ready for the next React Router major (no future-flag warnings)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    window.history.pushState({}, "", "/");
    render(<App />);
    const routerWarnings = warn.mock.calls.filter(([msg]) => String(msg).includes("React Router"));
    expect(routerWarnings).toEqual([]);
  });

  it("renders the home page at /", () => {
    window.history.pushState({}, "", "/");
    const { container } = render(<App />);
    expect(container.querySelector("#kontakt")).toBeInTheDocument();
  });

  it("renders the 404 page for an unknown route", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    window.history.pushState({}, "", "/does-not-exist");
    render(<App />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
  });
});
