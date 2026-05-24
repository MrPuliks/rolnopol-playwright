# rolnopol-playwright

Playwright tests for [Rolnopol application](https://github.com/jaktestowac/rolnopol).

Technologies used:

- Typescript
- Node.js
- Playwright
- ESLint
- Prettier
- GitHub Actions

# Table of Contents

- [Setup](#setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Architecture](#architecture)
  - [Page objects](#page-objects)
  - [Tests](#tests)
  - [Test data](#test-data)
  - [Configs](#configs)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [Github workflows](#github)
- [Running tests locally](#running-tests-locally)
- [Running tests in CI](#running-tests-in-ci)

## Setup

### Requirements

- [Node.js 24+](https://nodejs.org/en/download) installed
- [npm 11+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed

### Installation

Run following command in terminal to check if Node and NPM are installed:

```bash
node -v
npm -v
```

Download or clone repository ([Git](https://git-scm.com/install/windows)):

```bash
git clone https://github.com/MrPuliks/rolnopol-playwright.git
```

Run following command in terminal to download and install all required packages:

```bash
npm install
```

To install and run Rolnopol application locally use following commands or follow Rolnopol README.

```bash
git clone https://github.com/jaktestowac/rolnopol.git
cd rolnopol
npm i && npm run start
```

## Architecture

Structure of the project:

```text
rolnopol-playwright
    ├── .githooks/ (hooks)
    ├── .github/ (workflows and actions for Github CI/CD)
    ├── .vscode (workspace enforced settings)
    ├── configs/ (configuration files)
    ├── src/
    │    ├── api/ (objects and functions for API handling)
    │    ├── fixtures/ (Playwright fixtures)
    │    └── pages/ (page objects and handlers)
    ├── tests/ (Playwright tests)
    ├── .prettierrc
    ├── eslint.config.mts
    ├── package.json
    ├── package-lock.json
    ├── playwright.config.ts (default fallback, use configs/ when possible)
    ├── tsconfig.json
    └── README.md
```

### Page objects

Repository uses Page Object Model (POM) to handle and maintain application structure. Pages are divided by module first and then feature. Elements common between pages are located separately.

```text
src/
 └── pages/
        ├── common
        ├── home
        ├── login
        ├── profile
        ├── staffFields
        │    ├── main
        │    ├── assign
        │    └── charts
        ├── financial
        │    ├── transfers
        │    ├── transactions
        │    └── history
        └── ...
```

### Tests

All tests are located in `tests/`.

```text
tests/
  ├── modules/
  │     └── login/
  └── api/
```

### Test Data

All test data that is used by tests, upload files, downloaded files and predefined objects to fill out forms.

```text
resources/
```

### Configs

All configuration files are located in `/configs`.

```text
rolnopol-playwright/
       └── configs/
               ├── playwright
               └── ...
```

### ESLint

For static code analysis repository uses ESLint with additional Typescript and Playwright packages. In addition to strictTypeChecked configuration, ESLint is using rules recommended by Playwright documentation.

ESLint is enforced with:

1. `.githooks/pre-commit` prevents commits with failed ESLint.
2. `.github/actions/codeQuality/run_eslint` runs for every merge request for Reviewer reassurance.

### Prettier

For code formatting repository uses Prettier with standard configuration.

- all default fields with default values are set in `.prettierrc` to make sure every contributor will use same rules
- config is enforced in `.vscode/settings.json` for whole workspace to make sure every contributor will use those rules
- `.githooks/pre-commit` will run Prettier for all Staged Changes before commit

### Github

For CI/CD repository uses Github Actions and Workflows.

There are 3 workflows:

- `mergeReports.yml`, for handling reports from multiple shards and returning merged HTML report
- `runChecks.yml`, for running typecheck and ESLint after merge request
- `runTests.yml`, for running tests on demand and after merge request

All steps in workflows are divided into single responsibility Actions, located in `.github/actions/`, divided by their purpose.

## Running tests locally

To run tests locally, use scripts from `package.json`, that use configurations from `/configs/playwright`.

Before running tests, app must be downloaded and started.
Local configuration assumes that app is run on `http://localhost:3000` (this can be changed as `baseURL` in `configs\playwright\playwright.local.config.ts`)

```bash
git clone https://github.com/jaktestowac/rolnopol.git
cd rolnopol
npm i && npm run start
```

Basic test run, for all browsers:

```bash
npm run test:local
```

To run tests on specific browser:

```bash
npm run test:local -- --project=chromium
```

## Running tests in CI

After every merge/pull request to `main` branch, tests will be run automatically as GitHub workflow.

To run them manually

1. Open repository [Actions tab](https://github.com/MrPuliks/rolnopol-playwright/actions).
2. Select `Run tests` workflow on the left.
3. Open `Run workflow` dropdown on the right, located on blue banner.
4. Select branch, browser and amount of workers to use.
5. Click `Run workflow`.

All tests will be run and HTML report will be generated.

Report download URL will be generated in `Upload HTML report` action.
Download ZIP from URL, upack it locally to `playwright-report` folder and run command:

```bash
npx playwright show-report
```

By default, tests will be run on `main` branch, for all browsers, for all available workers.
