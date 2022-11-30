export enum BasePageSelectors {
  acceptCookiesButton = 'xpath=//a[contains(text(), "ACCEPT")]',
}

export enum HomePageSelectors {
  platformLink = 'xpath=//a[@href="https://mostly.ai/synthetic-data-platform/"]/span[text()="Platform"]',
  syntheticDataLink = 'xpath=//a[@href="https://mostly.ai/synthetic-data/"]/span[text()="Synthetic Data"]',
  resourcesLink = 'xpath=//a[@href="https://mostly.ai/resources/"]/span[text()="Resources"]',
  companyLink = 'xpath=//a[@href="https://mostly.ai/about-us/"]/span[text()="Company"]',
  searchIcon = 'xpath=//button[@aria-label="Open search"]',
  searchFieldPlaceholder = 'Search...',
  noSearchResultsHeadingText = 'Sorry, no results for:',
  contactLink = 'xpath=//a[@href="https://mostly.ai/contact/"]//div[text()="Contact"]',
}

export enum ContactPageSelectors {
  firstNameInputField = 'xpath=//input[@name="firstname"]',
  lastNameInputField = 'xpath=//input[@name="lastname"]',
  emailInputField = 'xpath=//input[@name="email"]',
  phoneInputField = 'xpath=//input[@name="mobilephone"]',
  companyInputField = 'xpath=//input[@name="company"]',
  countryDropDown = 'xpath=//select[@name="country"]',
  messageTextarea = 'xpath=//textarea[@name="message"]',
  marketingCheckbox = 'xpath=//input[@type="checkbox"]/following-sibling::span[text()="Marketing offers and updates."]',
}
