import { test as base, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parse } from "smol-toml";

type HeaderRule = { for: string; values: Record<string, string> };

const netlify = parse(readFileSync(new URL("../netlify.toml", import.meta.url), "utf8")) as {
  headers?: HeaderRule[];
};
export const headerRules: HeaderRule[] = netlify.headers ?? [];

function matches(pattern: string, pathname: string) {
  const regex = new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
  return regex.test(pathname);
}

export function netlifyHeadersFor(pathname: string) {
  return Object.assign({}, ...headerRules.filter((r) => matches(r.for, pathname)).map((r) => r.values));
}

/**
 * Serves the `vite preview` build with the response headers Netlify would add from netlify.toml,
 * and fails the test on any console error or CSP violation.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: async ({ page, baseURL }, provide) => {
    const errors: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(err.message));

    await page.route(`${baseURL}/**`, async (route) => {
      if (route.request().method() !== "GET") return route.fallback();
      const response = await route.fetch();
      const { pathname } = new URL(route.request().url());
      await route.fulfill({ response, headers: { ...response.headers(), ...netlifyHeadersFor(pathname) } });
    });
    await page.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (e) =>
        console.error(`CSP violation: ${e.violatedDirective} blocked ${e.blockedURI}`),
      );
    });

    await provide(errors);
    expect(errors, "console errors").toEqual([]);
  },
});

export { expect };
