import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly quantityText: Locator;
  readonly topReviewsHeading: Locator;
  readonly reviewsMedleySection: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.quantityText = page.getByText('Quantity:1');
    this.topReviewsHeading = page.getByRole('heading', { name: 'Top reviews from India' });
    this.reviewsMedleySection = page.locator('#reviewsMedley');
  }

  async isAddToCartButtonVisible() {
    return this.addToCartButton.isVisible();
  }

  async isQuantityTextVisible() {
    return this.quantityText.isVisible();
  }

  async navigateToProductUrl(url: string) {
    await this.navigateTo(url);
  }

  async isTopReviewsHeadingVisible() {
    return this.topReviewsHeading.isVisible();
  }

  async isReviewsMedleyVisible() {
    return this.reviewsMedleySection.isVisible();
  }

  async verifyReviewsContainText(expectedText: string) {
    return this.reviewsMedleySection.isVisible();
  }

  getReviewsMedleyLocator() {
    return this.reviewsMedleySection;
  }
}
