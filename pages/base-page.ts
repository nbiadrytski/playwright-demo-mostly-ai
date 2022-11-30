import { expect, Locator, Page } from '@playwright/test';
import Logger from "../utils/logger";
import { BasePageSelectors } from "../utils/selectors";

export class BasePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator
  logger: typeof Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = Logger;
    this.acceptCookiesButton = page.locator(BasePageSelectors.acceptCookiesButton);
  }

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url);
    this.logger.info(`Navigated to ${url}`);
  }

  async acceptCookies(): Promise<void> {
    await this.page.mouse.move(0, 0);
    await this.page.waitForSelector(BasePageSelectors.acceptCookiesButton);
    await this.acceptCookiesButton.click();
    await expect(this.acceptCookiesButton).not.toBeVisible();
    this.logger.info('Accepted cookies');
  }

}