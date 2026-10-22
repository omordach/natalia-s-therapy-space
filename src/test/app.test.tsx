import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import App from "@/App";
import { render } from "@testing-library/react";

describe("App routing", () => {
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
