import { defineConfig } from '@playwright/test';
import { BASE_URL } from '@config/env.js';

export default defineConfig({
  testDir: './src/tests',

  timeout: 60 * 1000,

  use: {
    baseURL: BASE_URL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: '../reports/html' }],
    ['json', { outputFile: 'playwright-report/results.json' }]
  ],
});
