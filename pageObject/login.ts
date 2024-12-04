import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  usernameInput = '#username';
  passwordInput = '#password';
  submitButton = 'button[type="submit"]';

  // Actions
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }
}