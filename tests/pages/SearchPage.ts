import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchBoxInput: Locator;
  readonly goButton: Locator;
  readonly resultsHeading: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBoxInput = page.getByRole('searchbox', { name: 'Search Amazon.in' });
    this.goButton = page.getByRole('button', { name: 'Go', exact: true });
    this.resultsHeading = page.getByRole('heading', { name: 'Results', exact: true });
    this.productName = page.locator('//div[@data-cy="title-recipe"]/a');
  }

  async clickSearchBox() {
    await this.searchBoxInput.click();
  }

  async enterSearchQuery(query: string) {
    await this.searchBoxInput.fill(query);
  }

  async clickGoButton() {
    await this.goButton.click();
  }

  async isResultsHeadingVisible() {
    return this.resultsHeading.isVisible();
  }

  async clickProductLink() {
    await this.productName.nth(0).click();
  }
}
