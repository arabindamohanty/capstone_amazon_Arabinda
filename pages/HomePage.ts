import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import fs from 'fs';
import path from 'path';

export class HomePage extends BasePage {
  readonly mobilesLink: Locator;
  readonly laptopsAccessoriesLink: Locator;
  readonly dellBrandLink: Locator;
  readonly pagetitle: Locator;
  readonly menuItems: Locator;
  readonly searchBoxInput: Locator;
  readonly goButton: Locator;
  readonly resultsHeading: Locator;
  readonly productName: Locator;


  constructor(page: Page) {
    super(page);
    this.mobilesLink = page.getByRole('link', { name: 'Mobiles' });
    this.laptopsAccessoriesLink = page.getByRole('link', { name: 'Laptops & Accessories' });
    this.dellBrandLink = page.getByRole('link', { name: 'Dell', exact: true });
    this.pagetitle = page.locator('[aria-label="Amazon.in"]');
    this.menuItems = page.locator('[class="nav-a-content"]');
     this.searchBoxInput = page.getByRole('searchbox', { name: 'Search Amazon.in' });
    this.goButton = page.getByRole('button', { name: 'Go', exact: true });
    this.resultsHeading = page.getByRole('heading', { name: 'Results', exact: true });
    this.productName = page.locator('//div[@data-cy="title-recipe"]/a');
  }

  async navigateToAmazon(url: string) {
    await this.navigateTo(url);
    await this.pagetitle.waitFor();
    console.log('Navigated successfully to :', url);
  }

  async hoverAndClickMobiles() {
    await this.mobilesLink.hover();
    await this.page.waitForTimeout(2000);
    await this.mobilesLink.click();
    console.log('Hovered and clicked on Mobiles link');
  }

  async getMenuItems() {
    await this.menuItems.nth(0).waitFor();
    const items = await this.menuItems.allTextContents();
    const cleanedItems = items
      .map(item => item.trim().replace(/\n/g, ''))
      .filter(item => item.length > 0);
    
    cleanedItems.unshift('Electronics');
    console.log('Total Menu items:', cleanedItems.length);
    console.log('Menu items are:', cleanedItems);
    
    return cleanedItems;
  }

  async captureScreenshot(filename: string) {
    // Wait for page to be stable before taking screenshot
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: filename });
    console.log(`Captured screenshot: ${filename}`);
  }

  async compareScreenshots(savedSnapshot: string, newSnapshotName: string) {
    await expect(savedSnapshot).toMatchSnapshot(newSnapshotName);
    console.log(`Screenshots match: ${newSnapshotName}`);
  }

  async hoverLaptopsAccessories() {
    await this.laptopsAccessoriesLink.hover();
    await this.page.waitForTimeout(2000);
    await this.page.getByText('Dell').waitFor();
    console.log('Hovered on Laptops & Accessories link');
  }

  async clickDellBrand() {
    await this.dellBrandLink.click();
    console.log('Clicked on Dell brand link');
  }

   async clickSearchBox() {
    await this.searchBoxInput.click();
    console.log('Clicked on search box');
  }

  async enterSearchQuery(query: string) {
    await this.searchBoxInput.fill(query);
    console.log(`Entered ${query} in the search box`);
  }

  async clickGoButton() {
    await this.goButton.click();
    console.log('Clicked on Go button');
  }

  async isResultsHeadingVisible() {
    const isVisible = await this.resultsHeading.isVisible();
  }

  async getProductName() {
    await this.productName.nth(0).waitFor();
    const name = await this.productName.nth(0).textContent();
    console.log('First product name:', name);
  }

  async clickFirstProduct() {
    await this.productName.nth(0).click();
  }

  //get all product names and click on the first product which contains dell in the name
  async clickFirstDellProduct() {
    const productNames = await this.productName.allTextContents();
    for (let i = 0; i < productNames.length; i++) {
      if (productNames[i].toLowerCase().includes('dell')) {
        await this.productName.nth(i).click();
        break;
      }
    }
  }
}
