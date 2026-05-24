import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./../../tests",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    headless: false,
    trace: "retain-on-failure",
    video: "on",
    screenshot: "on",
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
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
