import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import pl from "@/locales/pl.json";
import { renderWithProviders } from "./render";

describe("Index page", () => {
  it("renders every section in order", () => {
    const { container } = renderWithProviders(<Index />);
    const ids = [...container.querySelectorAll("main > section[id]")].map((s) => s.id);
    expect(ids).toEqual(["o-mnie", "oferta", "dla-kogo", "cennik", "lokalizacja", "kontakt"]);
    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("links every nav item to an existing section", () => {
    const { container } = renderWithProviders(<Index />);
    const nav = container.querySelector("header nav") as HTMLElement;
    const hrefs = within(nav)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
    for (const href of hrefs) {
      expect(href, String(href)).toMatch(/^#/);
      expect(container.querySelector(href as string), String(href)).toBeInTheDocument();
    }
  });

  it("shows no untranslated keys", () => {
    const { container } = renderWithProviders(<Index />);
    expect(container.textContent).not.toMatch(/\b(nav|hero|about|services|forWho|howIWork|pricing|location|contact|footer)\.[a-zA-Z]+/);
    expect(screen.getAllByText(pl.hero.title).length).toBeGreaterThan(0);
  });

  it("opens every external link in a new tab without opener access", () => {
    const { container } = renderWithProviders(<Index />);
    const external = [...container.querySelectorAll<HTMLAnchorElement>("a[target='_blank']")];
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a.rel, a.href).toContain("noopener");
      expect(a.rel, a.href).toContain("noreferrer");
    }
  });
});
