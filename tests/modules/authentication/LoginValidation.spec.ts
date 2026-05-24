import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../src/pages/authentication/LoginPage.js";
import { ExistingUsers, IncorrectUsers } from "../../../resources/Users.js";

let loginPage: LoginPage;

test.describe(`Login validation`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await LoginPage.goTo(page);
    loginPage = new LoginPage(page);
  });

  test("User can successfully log in", async ({ page }) => {
    await loginPage.loginAs(ExistingUsers.demo);
    await expect(page).toHaveTitle(/Profile - Rolnopol/);
  });

  test("User inserts incorrect email", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.loginAs(IncorrectUsers.incorrectEmail);
    const error = await loginPage.getEmailError();
    expect(error, "Error message should be displayed").toBeTruthy();
  });

  test("User inserts incorrect password", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.loginAs(IncorrectUsers.incorrectPassword);
    const error = await loginPage.getPasswordError();
    expect(error, "Error message should be displayed").toBeTruthy();
  });
});
