import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/authentication/LoginPage.js";
import { ExistingUsers } from "../../../resources/Users.js";
import { FinancialTrackingPage } from "../../../src/pages/financialTracking/FinancialTrackingPage.js";
import type { AddNewTransactionForm } from "../../../src/pages/financialTracking/AddNewTransactionForm.js";
import { SimpleTransactions } from "../../../resources/Transactions.js";

let loginPage: LoginPage;
let financialPage: FinancialTrackingPage;
let newTransactionForm: AddNewTransactionForm;
let balance: number;

test.describe.configure({ mode: "serial" });

test.describe(`Financial Tracking Validation`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = await LoginPage.goTo(page);
    await loginPage.loginAs(ExistingUsers.demo);
    financialPage = await FinancialTrackingPage.goTo(page);
  });

  test("Adding funds to account", async () => {
    balance = await financialPage.getCurrentBalance();

    newTransactionForm = await financialPage.openAddNewTransaction();

    await newTransactionForm.addTransaction(SimpleTransactions.addFunds);

    expect(await financialPage.getCurrentBalance(), "Incorrect balance after adding funds").toBe(
      balance + SimpleTransactions.addFunds.amount
    );
  });

  test("Removing funds from account", async () => {
    balance = await financialPage.getCurrentBalance();

    newTransactionForm = await financialPage.openAddNewTransaction();

    await newTransactionForm.addTransaction(SimpleTransactions.removeFunds);

    expect(await financialPage.getCurrentBalance(), "Incorrect balance after removing funds").toBe(
      balance - SimpleTransactions.removeFunds.amount
    );
  });
});
