import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login";
import { BoardPage } from "../pageObject/boardPage";
import * as testData from "../test-data/test-data.json";

test.describe("board test cases", () => {
  let loginPage: LoginPage;
  let boardPage: BoardPage;
  test.beforeEach(async ({ page }) => {
    await page.goto(testData.url.webApp);
    loginPage = new LoginPage(page);
    await loginPage.login(testData.login.username, testData.login.password);
    boardPage = new BoardPage(page);
  });

  test("test case 1 verify web app implement user authentication in to do column with tags", async ({ page }) => {
    const task = page.locator(boardPage.columns).nth(0);
    const taskInToDo = task.locator("text=Implement user authentication");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(0);
    const expectedTags = testData.tags.tag1;

    await Promise.all(
      expectedTags.map(async (tag) => {
        const tagLocator = tags.locator(`text=${tag}`);
        await expect(tagLocator).toBeVisible();
      })
    );
  });
  test("test case 2 verify web app navigation bug in to do column with tags", async ({ page }) => {
    const task = page.locator(boardPage.columns).nth(0);
    const taskInToDo = task.locator("text=Fix navigation bug");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(1);
    const expectedTags = testData.tags.tag2;
    await expect(tags).toContainText(expectedTags);
  });
  test("test case 3 verify web app design system updates in progress column with tags", async ({ page }) => {
    const task = page.locator(boardPage.columns).nth(1);
    const taskInProgress = task.locator("text=Design system updates");
    await expect(taskInProgress).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(2);
    const expectedTags = testData.tags.tag3;
    await expect(tags).toContainText(expectedTags);
  });
  test("test case 4 verify mobile app push notification system in to do column with tags", async ({ page }) => {
    await page.locator(boardPage.mobileNav).click();
    const task = page.locator(boardPage.columns).nth(0);
    const taskInToDo = task.locator("text=Push notification system");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(0);
    const expectedTags = testData.tags.tag4;
    await expect(tags).toContainText(expectedTags);
  });
  test("test case 5 verify mobile app offile mode in progress column with tags", async ({ page }) => {
    await page.locator(boardPage.mobileNav).click();
    const task = page.locator(boardPage.columns).nth(1);
    const taskInProgress = task.locator("text=Offline mode");
    await expect(taskInProgress).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(1);
    const expectedTags = testData.tags.tag1;

    await Promise.all(
      expectedTags.map(async (tag) => {
        const tagLocator = tags.locator(`text=${tag}`);
        await expect(tagLocator).toBeVisible();
      })
    );
  });
  test("test case 6 verify mobile app app icon design in done column with tags", async ({ page }) => {
    await page.locator(boardPage.mobileNav).click();
    const task = page.locator(boardPage.columns).nth(3);
    const taskInDone = task.locator("text=App icon design");
    await expect(taskInDone).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(2);
    const expectedTags = testData.tags.tag3;
    await expect(tags).toContainText(expectedTags);
  });
});
