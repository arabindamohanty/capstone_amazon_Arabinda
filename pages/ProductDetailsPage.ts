import { Page, Locator , expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly topReviewsHeading: Locator;
  readonly quantityDropdown: Locator;
  readonly reviews: Locator;
  readonly addedToCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.topReviewsHeading = page.getByRole('heading', { name: 'Top reviews from India' });
    this.quantityDropdown = page.locator('select[name="quantity"]');
    this.reviews = page.locator('#customerReviews .review-text-content');
    this.addedToCartMessage = page.getByText('Added to Cart');
  }

  async isAddToCartButtonVisible() {
  await expect(this.addToCartButton).toBeVisible();
  console.log('Add to Cart button is visible');
  }

  async isTopReviewsHeadingVisible() {
    await expect(this.topReviewsHeading).toBeVisible();
    console.log('Top reviews from India section is visible');
  }
  async isQuantityDropdownVisible() {
    await expect(this.quantityDropdown).toBeVisible();
    console.log('Quantity dropdown is visible');

  }

  async isquantitySetToOne() {
  await expect(this.quantityDropdown).toHaveValue('1');
  console.log('Quantity is set to 1 by default');
  }

  async saveReviewsToFile() {
    const reviews = await this.reviews.allTextContents();
    const fs = require('fs');
    fs.writeFileSync('reviews.txt', reviews.join('\n\n'));
    console.log('Saved reviews to reviews.txt');
}

async addToCart() {
  await this.addToCartButton.waitFor();
  await this.addToCartButton.click();
  console.log('Clicked on Add to Cart button'); 
}

async verifyProductAddedToCart() {
   await expect(this.addedToCartMessage).toBeVisible();
   console.log('Product is added to cart message is visible');
}
}
