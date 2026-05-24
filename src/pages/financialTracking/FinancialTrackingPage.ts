import { type Page, type Locator } from "@playwright/test";
import { AddNewTransactionForm } from "./AddNewTransactionForm.js";
import { parseMoneyToNumber, removeCurrency } from "../../utilities/parseMoney.js";

/**
 * Financial Tracking page.
 */
export class FinancialTrackingPage {
  private openAddNewTransactionDropdown: Locator;
  private currentBalanceField: Locator;

  constructor(private readonly page: Page) {
    this.openAddNewTransactionDropdown = this.page
      .locator('[id="transaction-form-header"]')
      .locator('[id="collapse-icon"]');
    this.currentBalanceField = this.page.locator('[id="current-balance"]');
  }

  /** Navigate to `Financial Tracking` page using top navigation bar. */
  public static async goTo(page: Page): Promise<FinancialTrackingPage> {
    console.log(`Navigating to 'Financial Tracking' page.`);
    await page.getByTestId("nav-financial").click();
    return new FinancialTrackingPage(page);
  }

  /** Get current account balance. */
  public async getCurrentBalance(): Promise<number> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    const balance = await this.currentBalanceField.textContent();

    if (!balance) {
      return 0;
    }
    return parseMoneyToNumber(removeCurrency(balance));
  }

  /** Open `Add new transaction` form. */
  public async openAddNewTransaction(): Promise<AddNewTransactionForm> {
    await this.openAddNewTransactionDropdown.click();
    return new AddNewTransactionForm(this.page);
  }
}
