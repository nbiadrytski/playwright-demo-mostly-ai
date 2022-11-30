import { expect, Locator, Page } from '@playwright/test';
import { baseUrl, HOME_PAGE_TITLE} from "../utils/constants";
import { BasePage } from "./base-page";
import { ContactPageSelectors, HomePageSelectors } from "../utils/selectors";

type BookmarksLocators = HomePageSelectors.platformLink |
  HomePageSelectors.syntheticDataLink |
  HomePageSelectors.companyLink |
  HomePageSelectors.resourcesLink;

export class HomePage extends BasePage {
  readonly platformLink: Locator;
  readonly syntheticDataLink: Locator;
  readonly resourcesLink: Locator;
  readonly companyLink: Locator;
  readonly searchIcon: Locator;
  readonly searchFieldPlaceholder: Locator;
  readonly noSearchResultsHeadingText: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    super(page);
    this.platformLink = page.locator(HomePageSelectors.platformLink);
    this.syntheticDataLink = page.locator(HomePageSelectors.syntheticDataLink);
    this.resourcesLink = page.locator(HomePageSelectors.resourcesLink);
    this.companyLink = page.locator(HomePageSelectors.companyLink);
    this.searchIcon = page.locator(HomePageSelectors.searchIcon);
    this.searchFieldPlaceholder = page.getByPlaceholder(HomePageSelectors.searchFieldPlaceholder);
    this.noSearchResultsHeadingText = page.getByRole('heading', {name: HomePageSelectors.noSearchResultsHeadingText});
    this.contactLink = page.locator(HomePageSelectors.contactLink);
  }

  async navigate(): Promise<void> {
    await super.navigate('.');
    await expect(this.page).toHaveTitle(HOME_PAGE_TITLE);
  }

  async search(searchText: string): Promise<void> {
    await this.searchIcon.click();
    await expect(this.searchFieldPlaceholder).toBeVisible();
    await this.searchFieldPlaceholder.fill(searchText);
    await this.page.keyboard.press('Enter');
    await expect(this.page).toHaveURL(`${baseUrl}?s=${searchText}`);
    this.logger.info(`Searched for ${searchText} text`);
  }

  async hoverOverBookmark(bookmark: BookmarksLocators, expectedSelector: string): Promise<void> {
    await this.page.hover(bookmark);
    await this.page.waitForSelector(expectedSelector);
    this.logger.info(`Hovered over ${bookmark} bookmark`);
  }

  async goToContactPageFromCompanyBookmark() {
    await this.hoverOverBookmark(HomePageSelectors.companyLink, HomePageSelectors.contactLink)
    await this.contactLink.click();
    await this.page.waitForSelector(ContactPageSelectors.firstNameInputField, {timeout: 50000});
    this.logger.info(`Navigated to /contact page from Company bookmark`);
  }

}