import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4188",
    viewport: { width: 1366, height: 768 },
    headless: true,
    channel: process.env.CI ? undefined : "chrome",
  },
  webServer: {
    command: `"${process.execPath}" scripts/serve.mjs --port 4188`,
    url: "http://127.0.0.1:4188",
    reuseExistingServer: false,
  },
});
