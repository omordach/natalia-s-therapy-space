import { describe, expect, it, vi } from "vitest";
import { render, renderHook, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { STORAGE_KEY } from "@/locales";
import pl from "@/locales/pl.json";
import uk from "@/locales/uk.json";

const wrapper = ({ children }: { children: ReactNode }) => (
  <LocalizationProvider>{children}</LocalizationProvider>
);

function setBrowserLanguage(lang: string) {
  vi.spyOn(navigator, "language", "get").mockReturnValue(lang);
}

describe("LocalizationProvider", () => {
  it("defaults to Polish for an unsupported browser language", () => {
    setBrowserLanguage("de-DE");
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("pl");
  });

  it("detects Ukrainian from the browser language", () => {
    setBrowserLanguage("uk-UA");
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("uk");
  });

  it("prefers the stored locale over the browser language", () => {
    setBrowserLanguage("pl-PL");
    localStorage.setItem(STORAGE_KEY, "uk");
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("uk");
  });

  it("ignores an invalid stored locale", () => {
    setBrowserLanguage("pl-PL");
    localStorage.setItem(STORAGE_KEY, "xx");
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("pl");
  });

  it("persists locale changes", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    act(() => result.current.setLocale("uk"));
    expect(localStorage.getItem(STORAGE_KEY)).toBe("uk");
  });

  it("resolves dot-notation keys, interpolates params and falls back to the key", () => {
    setBrowserLanguage("pl-PL");
    const { result } = renderHook(() => useTranslation(), { wrapper });
    const t = result.current.t;
    expect(t("hero.title")).toBe(pl.hero.title);
    expect(t("footer.copyright", { year: 2030 })).toBe(pl.footer.copyright.replace("{{year}}", "2030"));
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(t("does.not.exist")).toBe("does.not.exist");
  });

  it("throws when used outside the provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTranslation())).toThrow(/LocalizationProvider/);
  });
});

describe("LanguageSwitcher", () => {
  it("switches the visible language", async () => {
    setBrowserLanguage("pl-PL");
    function Probe() {
      const { t } = useTranslation();
      return <p>{t("nav.about")}</p>;
    }
    render(
      <LocalizationProvider>
        <LanguageSwitcher />
        <Probe />
      </LocalizationProvider>,
    );
    expect(screen.getByText(pl.nav.about)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Українська/ }));
    expect(screen.getByText(uk.nav.about)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Українська/ })).toHaveAttribute("aria-pressed", "true");
  });
});
