import { Page ,expect } from '@playwright/test';

export class BoardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
 
  // Selectors
  columns = '.flex.flex-col .w-80'
  cardTags = '.flex-col > .bg-white > .flex-wrap' 
  mobileNav = '.w-64 > .flex-1 > :nth-child(2)'
 }
