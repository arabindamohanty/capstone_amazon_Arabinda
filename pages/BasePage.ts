import { expect, Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  getPage() {
    return this.page;
  }

  async captureScreenshot(filename: string) {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.screenshot({ path: filename });
    console.log(`Captured screenshot: ${filename}`);
  }

  async compareScreenshots(snapshotName: string) {
    expect(await this.page.screenshot()).toMatchSnapshot(snapshotName);
    console.log('Screenshots matched');
  }

}