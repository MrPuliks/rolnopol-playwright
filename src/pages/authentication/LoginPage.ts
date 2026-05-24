import { type Page, type Locator } from "@playwright/test";
import type { UserCredentials } from "./types/UserCredentials.js";

/**
 * Login page.
 */
export class LoginPage {
  private emailInputField: Locator;
  private passwordInputField: Locator;
  private loginButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInputField = this.page.getByTestId("email-input");
    this.passwordInputField = this.page.getByTestId("password-input");
    this.loginButton = this.page.getByTestId("login-submit-btn");
  }

  /** Navigate to `Login` page using top navigation bar. */
  public static async goTo(page: Page) {
    console.log(`Navigating to Login page.`);
    await page.getByTestId("nav-login").click();
  }

  private async setEmail(email: string) {
    await this.emailInputField.clear();
    await this.emailInputField.fill(email);
  }

  private async setPassword(password: string) {
    await this.passwordInputField.clear();
    await this.passwordInputField.fill(password);
  }

  private async clickLogin() {
    await this.loginButton.click();
  }

  /** Returns true whether incorrect email error appears. */
  public async getEmailError(): Promise<boolean> {
    return this.page.getByText("Please enter a valid email address").isVisible();
  }

  /** Returns true whether incorrect password error appears. */
  public async getPasswordError(): Promise<boolean> {
    return this.page.getByText("Invalid credentials").isVisible();
  }

  /** Log in as specified User. */
  public async loginAs(user: UserCredentials) {
    console.log(`Logging in as user: ${user.email}/*****`);
    await this.setEmail(user.email);
    await this.setPassword(user.password);
    await this.clickLogin();

    if ((await this.getEmailError()) || (await this.getPasswordError())) {
      console.log("Login error");
    } else {
      await this.loginButton.waitFor({ state: "hidden" });
      console.log("Login success.");
    }
  }
}
