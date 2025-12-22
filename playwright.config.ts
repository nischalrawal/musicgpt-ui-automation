import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  timeout: 60 * 1000,

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: '../reports/html' }]
  ],
});
