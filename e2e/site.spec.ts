import { test, expect, netlifyHeadersFor } from "./fixtures";

test.beforeEach(async ({ page, consoleErrors: _ }) => {
  await page.goto("/");
});

test("loads the home page in Polish", async ({ page }) => {
  await expect(page).toHaveTitle(/Natalia/);
  await expect(page.locator("html")).toHaveAttribute("lang", /pl/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const id of ["o-mnie", "oferta", "dla-kogo", "cennik", "lokalizacja", "kontakt"]) {
    await expect(page.locator(`section#${id}`)).toBeAttached();
  }
});

test("serves netlify.toml headers in the test server", async ({ page }) => {
  const response = await page.reload();
  const expected = netlifyHeadersFor("/");
  for (const [name, value] of Object.entries(expected)) {
    expect(response?.headers()[name.toLowerCase()], name).toBe(value);
  }
});

test("switches language and remembers it", async ({ page }) => {
  const nav = page.locator("header nav").first();
  await expect(nav.getByRole("link", { name: "O mnie" })).toBeVisible();
  await nav.getByRole("button", { name: "Switch to Українська" }).click();
  await expect(nav.getByRole("link", { name: "Про мене" })).toBeVisible();
  await page.reload();
  await expect(page.locator("header nav").first().getByRole("link", { name: "Про мене" })).toBeVisible();
});

test("nav links scroll to their sections", async ({ page }) => {
  const nav = page.locator("header nav").first();
  await nav.getByRole("link", { name: "Kontakt" }).click();
  await expect(page).toHaveURL(/#kontakt$/);
  await expect(page.locator("#kontakt h2")).toBeInViewport();
  await nav.getByRole("link", { name: "Cennik" }).click();
  await expect(page.locator("#cennik h2")).toBeInViewport();
});

test("submits the contact form", async ({ page }) => {
  let posted: URLSearchParams | undefined;
  await page.route("**/", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    posted = new URLSearchParams(route.request().postData() ?? "");
    await route.fulfill({ status: 200, body: "" });
  });

  const form = page.locator("form[name='contact']:not([hidden])");
  await form.scrollIntoViewIfNeeded();
  await form.getByLabel("Imię").fill("Jan");
  await form.getByLabel("Email").fill("jan@example.com");
  await form.getByLabel("Wiadomość", { exact: true }).fill("Test");
  await form.getByRole("button").click();

  await expect(page.getByText("Wiadomość wysłana", { exact: true })).toBeVisible();
  expect(posted?.get("form-name")).toBe("contact");
  expect(posted?.get("name")).toBe("Jan");
});

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menu" }).click();
  const mobileNav = page.locator("header nav").last();
  await mobileNav.getByRole("link", { name: "Oferta" }).click();
  await expect(page.locator("#oferta h2")).toBeInViewport();
  await expect(mobileNav).toBeHidden();
});

test("renders design-token styles", async ({ page }) => {
  // Custom shadows come from @theme tokens; a broken token silently computes to "none".
  for (const selector of [".card-service", ".btn-primary", ".shadow-elevated"]) {
    const shadow = await page.locator(selector).first().evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow, selector).toMatch(/rgba\(80, 134, 112/);
  }

  // Hero heading uses leading-none from md up (as it did under Tailwind 3).
  const h1 = await page.getByRole("heading", { level: 1 }).evaluate((el) => {
    const cs = getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
  });
  expect(h1.lineHeight).toBe(h1.fontSize);

  // Body copy keeps the 28px line height from md up.
  const body = await page.locator("#oferta .text-body").first().evaluate((el) => getComputedStyle(el).lineHeight);
  expect(body).toBe("28px");
});
