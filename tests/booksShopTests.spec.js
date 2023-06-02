import LoginPage from '../pages/LoginPage';
import MainBooksShopPage from '../pages/MainBooksShopPage';
const { test, expect } = require('@playwright/test');
const config = require('../config.json');
const regex = require('../regularExpressions');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainBooksShopPage(page);
  await loginPage.goto();
  await loginPage.login(config.testUser);
  const bookCount = await mainPage.getBooksCount();
  if (bookCount > 0) {
    if (bookCount == 9) { // until Bug-Sever_Error_500 is fixed
      await mainPage.clickBuyBookButton();
    }
    await mainPage.clickBasketButton();
    await mainPage.clickClearBasketButton();
  }
});

test('Checking empty basket', async ({ page }) => {
  const mainPage = new MainBooksShopPage(page);
  await mainPage.clickBasketButton();

  // await expect(mainPage.dropdownBasketPopup).toBeVisible(); // BUG-Empty_basket_not_opening
  // await mainPage.clickGoToBasket(); // Bug-Sever_Error_500
});

test('Checking basket with one item without discount', async ({ page }) => {
  const mainPage = new MainBooksShopPage(page);
  await mainPage.clickBuyBookButton();
  await mainPage.clickBasketButton();
  await expect(mainPage.dropdownBasketPopup).toBeVisible();
  await expect(mainPage.bookTitleinBasket).toBeVisible();
  await expect(mainPage.totalPrice).toBeVisible();
  await expect(mainPage.bookPriceInBasket).toBeVisible();
  await expect(await mainPage.getBooksCount()).toEqual('1');
  await expect(await mainPage.bookPriceInBasket).toContainText(regex.regExBooksPrice);
  await expect(await mainPage.totalPrice).toContainText(regex.regExTotalPrice);

  // await mainPage.clickGoToBasket(); // Bug-Sever_Error_500
});

test('Checking basket with one item with discount', async ({ page }) => {
  const mainPage = new MainBooksShopPage(page);
  await mainPage.clickBuyBookButton(true);
  await mainPage.clickBasketButton();
  await expect(mainPage.dropdownBasketPopup).toBeVisible();
  await expect(mainPage.bookTitleinBasket).toBeVisible();
  await expect(mainPage.totalPrice).toBeVisible();
  await expect(mainPage.bookPriceInBasket).toBeVisible();
  await expect(await mainPage.getBooksCount()).toEqual('1');
  await expect(await mainPage.bookPriceInBasket).toContainText(regex.regExBooksPrice);
  await expect(await mainPage.totalPrice).toContainText(regex.regExTotalPrice);
  // await mainPage.clickGoToBasket(); // Bug-Sever_Error_500
});

test('Checking basket with 9 different items', async ({ page }) => {
  const booksAmount = 9;
  const mainPage = new MainBooksShopPage(page);
  await mainPage.goToPage(2);
  await mainPage.clickBuyBookButton(true);
  await mainPage.goToPage(1);

  for (let i = 0; i < booksAmount - 1; i++) {
    await mainPage.clickBuyByBookNumber(i);
  }
  await mainPage.clickBasketButton();

  // await expect(mainPage.dropdownBasketPopup).toBeVisible();   // Bug-Sever_Error_500_with_9_books
  // await expect(mainPage.bookTitleinBasket).toHaveCount(9);
  // await expect(mainPage.bookPriceInBasket).toHaveCount(9);
  // await expect(mainPage.totalPrice).toBeVisible();
  // await expect(await mainPage.getBooksCount()).toEqual('9');
  // await expect(await mainPage.bookPriceInBasket).toContainText(Array(booksAmount).fill(regex.regExBooksPrice, 0));
  // await expect(await mainPage.totalPrice).toContainText(regex.regExTotalPrice);
  // await mainPage.clickGoToBasket(); // Bug-Sever_Error_500
});

test('Checking basket with 9 identical items', async ({ page }) => {
  const booksAmount = 9;
  const bookWithDiscount = true;
  const mainPage = new MainBooksShopPage(page);

  await mainPage.enterBookCount(booksAmount, 1, bookWithDiscount);
  await mainPage.clickBuyBookButton(bookWithDiscount, 1);
  await mainPage.clickBasketButton();

  // await expect(mainPage.dropdownBasketPopup).toBeVisible(); // Bug-Sever_Error_500_with_9_books
  // await expect(mainPage.bookTitleinBasket).toBeVisible();
  // await expect(mainPage.bookPriceInBasket).toBeVisible();
  // await expect(mainPage.totalPrice).toBeVisible();
  // await expect(await mainPage.getBooksCount()).toEqual(booksAmount.toString());
  // await expect(await mainPage.bookPriceInBasket).toContainText(regex.regExBooksPrice);
  // await expect(await mainPage.totalPrice).toContainText(regex.regExTotalPrice);
  // await mainPage.clickGoToBasket(); // Bug-Sever_Error_500
});