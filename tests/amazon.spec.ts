import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

// Constants
const URL = 'https://www.amazon.in/';
const PRODUCT_SEARCH = 'Gaming Laptop';
const EXPECTED_REVIEW_TEXT = 'View Image Gallery Amazon Customer 5.0 out of 5 stars';

test('Amazon Laptop Search', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // Initialize Home Page
  const homePage = new HomePage(page);
  await homePage.navigateToAmazon(URL);
  await homePage.hoverAndClickMobiles();
  await homePage.getMenuItems();
  await homePage.hoverLaptopsAccessories();
  await homePage.clickDellBrand();

  // Initialize Search Page
  const searchPage = new SearchPage(page);
  await searchPage.clickSearchBox();
  await searchPage.enterSearchQuery(PRODUCT_SEARCH);
  await searchPage.clickGoButton();

  // Verify results are visible
  await expect(searchPage.resultsHeading).toBeVisible();

  // Handle new product page
  const [newPage] = await Promise.all(
  [context.waitForEvent('page'), searchPage.clickProductLink()]
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