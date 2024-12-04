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

  test("test case 1", async ({ page }) => {
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
  test("test case 2", async ({ page }) => {
    const task = page.locator(boardPage.columns).nth(0);
    const taskInToDo = task.locator("text=Fix navigation bug");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(1);
    const expectedTags = testData.tags.tag2;
    await expect(tags).toContainText(expectedTags);
  });
  test("test case 3", async ({ page }) => {
    const task = page.locator(boardPage.columns).nth(1);
    const taskInToDo = task.locator("text=Design system updates");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(2);
    const expectedTags = testData.tags.tag3;
    await expect(tags).toContainText(expectedTags);
  });
  test("test case 4", async ({ page }) => {
    await page.locator(boardPage.mobileNav).click();
    const task = page.locator(boardPage.columns).nth(0);
    const taskInToDo = task.locator("text=Push notification system");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(0);
    const expectedTags = testData.tags.tag4;
    await expect(tags).toContainText(expectedTags);
  });
  test("test case 5", async ({ page }) => {
    await page.locator(boardPage.mobileNav).click();
    const task = page.locator(boardPage.columns).nth(1);
    const taskInToDo = task.locator("text=Offline mode");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(1);
    const expectedTags = testData.tags.tag1;

    await Promise.all(
      expectedTags.map(async (tag) => {
        const tagLocator = tags.locator(`text=${tag}`);
        await expect(tagLocator).toBeVisible();
      })
    );
  });
  test("test case 6", async ({ page }) => {
    await page.locator(boardPage.mobileNav).click();
    const task = page.locator(boardPage.columns).nth(3);
    const taskInToDo = task.locator("text=App icon design");
    await expect(taskInToDo).toBeVisible();

    const tags = page.locator(boardPage.cardTags).nth(2);
    const expectedTags = testData.tags.tag3;
    await expect(tags).toContainText(expectedTags);
  });
});
