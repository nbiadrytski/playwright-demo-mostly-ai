import { expect, Locator, Page } from '@playwright/test';
import { ContactPageSelectors } from "../utils/selectors";
import { BasePage } from "./base-page";

export type ContactInfo = {
  firstName: { locator: Locator, value: string };
  lastName: { locator: Locator, value: string };
  email: { locator: Locator, value: string} ;
  phone: { locator: Locator, value: string };
  company: { locator: Locator, value: string };
  message: { locator: Locator, value: string };
  country:  string;
}

export class ContactPage extends BasePage {
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly emailInputField: Locator;
  readonly phoneInputField: Locator;
  readonly companyInputField: Locator;
  readonly messageTextarea: Locator;
  readonly marketingCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInputField = page.locator(ContactPageSelectors.firstNameInputField);
    this.lastNameInputField = page.locator(ContactPageSelectors.lastNameInputField);
    this.emailInputField = page.locator(ContactPageSelectors.emailInputField);
    this.phoneInputField = page.locator(ContactPageSelectors.phoneInputField);
    this.companyInputField = page.locator(ContactPageSelectors.companyInputField);
    this.messageTextarea = page.locator(ContactPageSelectors.messageTextarea);
    this.marketingCheckbox = page.locator(ContactPageSelectors.marketingCheckbox);
  }

  async fillInContactInfo(contactInfoObject: ContactInfo) {
    await this.firstNameInputField.fill(contactInfoObject.firstName.value);
    await this.lastNameInputField.fill(contactInfoObject.lastName.value);
    await this.emailInputField.fill(contactInfoObject.email.value);
    await this.phoneInputField.fill(contactInfoObject.phone.value);
    await this.companyInputField.fill(contactInfoObject.company.value);
    await this.page.selectOption(ContactPageSelectors.countryDropDown, contactInfoObject.country)
    await this.messageTextarea.fill(contactInfoObject.message.value);
    for (const item in contactInfoObject) {
      delete contactInfoObject.country;
      const itemObject = contactInfoObject[item];
      if (itemObject.locator === this.messageTextarea) {
        await expect.soft(itemObject.locator).toHaveText(itemObject.value);
      } else {
        await expect.soft(itemObject.locator).toHaveAttribute('value', itemObject.value);
      }
    }
    this.logger.info(`Filled in contact info: ${JSON.stringify(contactInfoObject)}`);
  }

}