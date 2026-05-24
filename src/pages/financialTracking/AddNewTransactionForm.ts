import { type Page, type Locator, expect } from "@playwright/test";
import type { Transaction, TransactionCategory, TransactionType } from "./types/Transactions.js";
import { parseMoneyToString } from "../../utilities/parseMoney.js";

/**
 * `Add new transaction` form in Financial Tracking page.
 */
export class AddNewTransactionForm {
  private incomeTypeButton: Locator;
  private expenseTypeButton: Locator;
  private amountInputField: Locator;
  private categoryDropdown: Locator;
  private descriptionInputField: Locator;
  private addTransactionButton: Locator;

  constructor(private readonly page: Page) {
    this.incomeTypeButton = this.page.locator('[data-type="income"]');
    this.expenseTypeButton = this.page.locator('[data-type="expense"]');
    this.amountInputField = this.page.locator('[id="transaction-amount"]');
    this.categoryDropdown = this.page.locator('[id="transaction-category"]');
    this.descriptionInputField = this.page.locator('[id="transaction-description"]');
    this.addTransactionButton = this.page.locator('[id="submit-transaction"]');
  }

  private async setTransactionType(type: TransactionType) {
    if (type === "income") {
      await this.incomeTypeButton.click();
    } else {
      await this.expenseTypeButton.click();
    }
  }

  private async setAmount(amount: number) {
    await this.amountInputField.clear();
    await this.amountInputField.fill(parseMoneyToString(amount));
  }

  private async setCategory(category: TransactionCategory) {
    await this.categoryDropdown.selectOption(category);
  }

  private async setCardNumber(cardNumber: string) {
    const cardNumberInputField = this.page.locator('[id="transaction-card-number"]');
    await cardNumberInputField.clear();
    await cardNumberInputField.fill(cardNumber);
  }

  private async setCVV(cvv: string) {
    const cvvInputField = this.page.locator('[id="transaction-cvv"]');
    await cvvInputField.clear();
    await cvvInputField.fill(cvv);
  }

  private async setDescription(description: string) {
    await this.descriptionInputField.clear();
    await this.descriptionInputField.fill(description);
  }

  private async clickAddTransaction() {
    await this.addTransactionButton.click();
  }

  /** Perform `Add transaction` operation. */
  public async addTransaction(transaction: Transaction) {
    await this.setTransactionType(transaction.type);
    await this.setAmount(transaction.amount);
    await this.setCategory(transaction.category);

    if (transaction.cardNumber && transaction.type == "income") {
      await this.setCardNumber(transaction.cardNumber);
    }

    if (transaction.cvv && transaction.type == "income") {
      await this.setCVV(transaction.cvv);
    }

    await this.setDescription(transaction.description);

    await this.clickAddTransaction();

    await expect(this.addTransactionButton).toBeDisabled({ timeout: 10000 });
    await expect(this.addTransactionButton).toBeEnabled({ timeout: 10000 });
  }
}
