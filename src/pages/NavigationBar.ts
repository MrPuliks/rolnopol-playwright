import { type Page, type Locator } from "@playwright/test";

export class NavigationBar {
  private homeButton: Locator;

  constructor(private readonly page: Page) {
    this.homeButton = this.page.getByTestId("nav-home");
  }

  async clickHome() {
    await this.homeButton.click();
  }
}
