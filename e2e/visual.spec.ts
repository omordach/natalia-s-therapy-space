import { test, expect } from "./fixtures";

const viewports = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
};
const sections = ["o-mnie", "oferta", "dla-kogo", "cennik", "lokalizacja", "kontakt"];

for (const [device, viewport] of Object.entries(viewports)) {
  test.describe(device, () => {
    test.use({ viewport });

    test.beforeEach(async ({ page, consoleErrors: _ }) => {
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
    });

    test("header and hero", async ({ page }) => {
      await page.waitForTimeout(1500);
      await expect(page).toHaveScreenshot(`${device}-hero.png`);
    });

    for (const id of sections) {
      test(`section ${id}`, async ({ page }) => {
        const section = page.locator(`section#${id}`);
        await section.scrollIntoViewIfNeeded();
        // Let framer-motion entrance animations finish, then keep the fixed header out of the shot.
        await page.waitForTimeout(1500);
        // Set via CSSOM rather than an injected <style>, which the site's CSP blocks.
        await page.locator("header").evaluate((el) => (el.style.visibility = "hidden"));
        await expect(section).toHaveScreenshot(`${device}-${id}.png`, {
          mask: [page.locator("iframe")],
          animations: "disabled",
        });
      });
    }

    test("footer", async ({ page }) => {
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await expect(footer).toHaveScreenshot(`${device}-footer.png`);
    });
  });
}
