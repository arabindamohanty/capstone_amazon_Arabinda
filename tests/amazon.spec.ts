import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

// Constants
const URL = 'https://www.amazon.in/';
const PRODUCT_SEARCH = 'Gaming Laptop';
const EXPECTED_REVIEW_TEXT = 'View Image Gallery Amazon Customer 5.0 out of 5 stars';

test('Amazon Laptop Add to Cart', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // Initialize Home Page
  const homePage = new HomePage(page);
  await homePage.navigateToAmazon(URL);
  await homePage.hoverAndClickMobiles();
  await homePage.getMenuItems();
  await homePage.captureScreenshot('Screenshot/home_page.png');
  await homePage.compareScreenshots('Screenshot/savedscreenshot.png', 'Screenshot/home_page.png');
  await homePage.hoverLaptopsAccessories();
  await homePage.clickDellBrand();

  // Search for product
  await homePage.clickSearchBox();
  await homePage.enterSearchQuery(PRODUCT_SEARCH);
  await homePage.clickGoButton();
  
  // Verify results are visible
  await expect(homePage.resultsHeading).toBeVisible();

  // Handle new product page
  const [newPage] = await Promise.all(
  [context.waitForEvent('page'), homePage.clickProductLink()]
  );


  // Initialize Product Details Page
  const productDetailsPage = new ProductDetailsPage(newPage);
  await expect(productDetailsPage.addToCartButton).toBeVisible();
  await expect(productDetailsPage.quantityText).toBeVisible();

  // Navigate directly to product URL
 

  // Verify reviews section
  await expect(productDetailsPage.topReviewsHeading).toBeVisible();
  await expect(productDetailsPage.reviewsMedleySection).toContainText(EXPECTED_REVIEW_TEXT);

  // Close the browser
  await browser.close();
});