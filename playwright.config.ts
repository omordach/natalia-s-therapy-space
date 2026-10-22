import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: "pl-PL",
    trace: "retain-on-failure",
  },
  // Pixel snapshots differ between macOS and Linux, so the visual project runs locally only.
  projects: [
    { name: "chromium", testIgnore: /visual\.spec/, use: { ...devices["Desktop Chrome"] } },
    { name: "visual", testMatch: /visual\.spec/, use: { ...devices["Desktop Chrome"] } },
  ],
  snapshotPathTemplate: "e2e/__screenshots__/{testFilePath}/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
