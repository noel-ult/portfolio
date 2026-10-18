import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3100";
export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "/tmp/noel-portfolio-playwright",
  timeout: 60000,
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL, screenshot: "only-on-failure", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: "npm start -- --port 3100", url: baseURL, reuseExistingServer: !process.env.CI },
});
