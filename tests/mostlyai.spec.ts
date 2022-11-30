import { expect, Locator, Page, test } from '@playwright/test';
import { HomePage } from "../pages/home-page";
import { HomePageSelectors } from "../utils/selectors";
import { BasePage } from "../pages/base-page";
import { ContactInfo, ContactPage } from "../pages/contact-page";

const SEARCH_STRING = 'sythetic';

async function assertSearchResult(homePage: HomePage, page: Page, searchString: string): Promise<void> {
  await expect.soft(
    homePage.noSearchResultsHeadingText,
    {message: `${HomePageSelectors.noSearchResultsHeadingText} search result text should be present `}).toBeVisible();
  await expect.soft(
    page.getByText(searchString),
    {message: `${searchString} search result text should be present `}).toBeVisible();
}

test.beforeEach(async ({ page }, testInfo ) => {
  console.log(`Running test: ${testInfo.title}`);
  await new HomePage(page).navigate();
});

test('home page bookmarks are visible', async ({ page }) => {
  const homePage = new HomePage(page);
  const bookmarks = {
    platform: homePage.platformLink,
    syntheticData: homePage.syntheticDataLink,
    resources: homePage.resourcesLink,
    company: homePage.companyLink,
  }
  for (const bookmark in bookmarks) {
    await expect(bookmarks[bookmark], {message: 'Home page bookmarks should be visible'}).toBeVisible();
  }
});

test('search returns expected results', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.search(SEARCH_STRING);
  await assertSearchResult(homePage, page, SEARCH_STRING);
});

test('fill in contact details', async ({ page }) => {
  await new BasePage(page).acceptCookies();
  const homePage = new HomePage(page);
  await homePage.goToContactPageFromCompanyBookmark();
  const contactPage = new ContactPage(page);
  const contactInfoObj: ContactInfo = {
    firstName: { locator: contactPage.firstNameInputField, value: 'FirstName' },
    lastName: { locator: contactPage.lastNameInputField, value: 'LastName' },
    email: { locator: contactPage.emailInputField, value: 'email@myemail.com' },
    phone: { locator: contactPage.phoneInputField, value: '2637426735' },
    company: { locator: contactPage.companyInputField, value: 'MyCompany' },
    message: { locator: contactPage.messageTextarea, value: 'Hello' },
    country: 'Andorra',
  }
  await contactPage.fillInContactInfo(contactInfoObj);
  await contactPage.marketingCheckbox.click();
});
