import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly mobilesLink: Locator;
  readonly laptopsAccessoriesLink: Locator;
  readonly dellBrandLink: Locator;
  readonly pagetitle: Locator;
  readonly menuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.mobilesLink = page.getByRole('link', { name: 'Mobiles' });
    this.laptopsAccessoriesLink = page.getByRole('link', { name: 'Laptops & Accessories' });
    this.dellBrandLink = page.getByRole('link', { name: 'Dell', exact: true });
    this.pagetitle = page.locator('[aria-label="Amazon.in"]');
    this.menuItems = page.locator('[class="nav-a-content"]');
  }

  async navigateToAmazon(url: string) {
    await this.navigateTo(url);
    await this.pagetitle.waitFor();
    console.log('Navigated successfully to :', url);
  }

  async hoverAndClickMobiles() {
    await this.mobilesLink.hover();
    await this.mobilesLink.click();
    console.log('Hovered and clicked on Mobiles link');
  }

  async getMenuItems() {
    await this.menuItems.nth(0).waitFor();
    const items = await this.menuItems.allTextContents();
    
    // Clean items by removing whitespace and newlines
    const cleanedItems = items
      .map(item => item.trim().replace(/\n/g, ''))
      .filter(item => item.length > 0);
    
    cleanedItems.unshift('Electronics');
    console.log('Total Menu items:', cleanedItems.length);
    console.log('Menu items are:', cleanedItems);
    
    return cleanedItems;
  }

  async hoverLaptopsAccessories() {
    await this.laptopsAccessoriesLink.hover();
    await this.page.getByText('Dell').waitFor();
    console.log('Hovered on Laptops & Accessories link');
  }

  async clickDellBrand() {
    await this.dellBrandLink.click();
    console.log('Clicked on Dell brand link');
  }
}
