import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./../../tests",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: 1,
  workers: 12,
  reporter: [['html'],["list"]],
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    trace: "retain-on-failure",
    video: "on",
    screenshot: "on",
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "safari",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
