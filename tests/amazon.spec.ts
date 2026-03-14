import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

// Constants
const amazonUrl = 'https://www.amazon.in/';
const productSearchText = 'Gaming Laptop';
const actualScreenshotPath = 'Screenshot/home_page.png';
const expectedScreenshotPath = 'Screenshot/savedscreenshot.png';

test('Amazon Laptop Add to Cart', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // Initialize Home Page
  const homePage = new HomePage(page);

  // Navigate to Amazon link
  await homePage.navigateToAmazon(amazonUrl);

  // Hover and click on Mobiles link
  await homePage.hoverAndClickMobiles();
  
  // Read the menu items and print the total number of menu items and the menu items
  await homePage.getMenuItems();

  // Capture screenshot of the home page and compare with the saved screenshot
  await homePage.captureScreenshot(actualScreenshotPath);
  await homePage.compareScreenshots(expectedScreenshotPath, actualScreenshotPath);
  
  // Hover and click on Laptops & Accessories link and then click on Dell link
  await homePage.hoverLaptopsAccessories();
  await homePage.clickDellBrand();

  // Search for Gaming Laptop in the search box
  await homePage.clickSearchBox();
  await homePage.enterSearchQuery(productSearchText);
  await homePage.clickGoButton();
  
  // Verify results are visible
  await expect(homePage.resultsHeading).toBeVisible();

  // Get the name of the first product in the search results
  await homePage.getProductName();

  // Click on the first product in the search results
  const [newPage] = await Promise.all(
  [context.waitForEvent('page'), homePage.clickFirstProduct()]
  );

  // Initialize Product Details Page
  const productDetailsPage = new ProductDetailsPage(newPage);
  
  // Verify Add to Cart button is visible
  await productDetailsPage.isAddToCartButtonVisible();

  // Verify quantity should be 1 from the dropdown
  await productDetailsPage.isQuantityDropdownVisible();
  await productDetailsPage.isquantitySetToOne();
  
  // Verify reviews section
  await productDetailsPage.isTopReviewsHeadingVisible();
  
  // Get the reviews under review section and store in an text file
  await productDetailsPage.saveReviewsToFile();
  
  // Add to cart
  await productDetailsPage.addToCart();

  // verify product is added to cart message is visible
  await productDetailsPage.verifyProductAddedToCart();

  // Close the browser
  await browser.close();
});