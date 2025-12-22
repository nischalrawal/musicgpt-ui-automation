# musicgpt-ui-automation

musicgpt-ui-automation is a Playwright-based test automation project for the MusicGPT web application. It provides end-to-end tests to ensure the UI functions correctly across browsers, supports debugging, and helps maintain application quality during development.

## Features 

- Cross-browser testing (Chromium, Firefox, WebKit)
- Interactive test UI mode for visual debugging
- Automated test generation with Playwright Codegen
- Supports running specific tests, debug mode, and headless/headed execution
- Easily integrates with CI/CD pipelines

## Prerequisites

- Node.js (v16 or higher)
- npm 

## Installation

```bash
git clone https://github.com/nischalrawal/musicgpt-ui-automation.git
cd musicgpt-ui-automation
npm install
```
## --- Running Tests ---

### Run all tests:
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test example
```

### Run tests in specific browser (chromium/chrome)
```bash
npx playwright test ---project=chromium
```

### Run tests with browser UI:
```bash
npx playwright test --headed
```

### Run test in single thread
```bash
npx playwright test --workers=1
```

## UI and Debugging

### Launch playwright test UI
```bash
npx playwright test --ui
```

### Run test in debug mode
```bash
npx playwright test --debug
```



