# playwright-poc

### Setup instructions:

```
npm install
npx playwright test tests/e2e.spec.ts   # Add '--project=chromium' if you plan to run the e2e test on a specific supported browser
```
_Note: If you are using VSCode to write your tests, I highly recommend that you install this plugin "Playwright Test for VSCode"._

### Latest test results
```
% npx playwright test tests/e2e.spec.ts                   

Running 3 tests using 3 workers
[chromium] › e2e.spec.ts:16:9 › on Sauce Demo system › a user is able to buy a product
Checkout: Overview
[webkit] › e2e.spec.ts:16:9 › on Sauce Demo system › a user is able to buy a product
Checkout: Overview
[firefox] › e2e.spec.ts:16:9 › on Sauce Demo system › a user is able to buy a product
Checkout: Overview
  3 passed (4.5s)
```
