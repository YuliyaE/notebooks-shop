class BasketPopupComponent {

    constructor(page) {
        this.page = page;

        this.dropdownBasketButton = '#dropdownBasket';
        this.dropdownBasketPopup = this.page.locator('[aria-labelledby=dropdownBasket]');
        this.booksInBasketCount = 'span.basket-count-items';
        this.bookTitleinBasket = this.page.locator('[class=basket-item-title]');
        this.bookPriceInBasket = this.page.locator('span.basket-item-price');
        this.totalPrice = this.page.locator('//span[@class="basket_price"]');
        this.clearBasketButton = this.page.locator("div.actionClearBasket");
        this.goToBasketButton = this.page.locator("//a[text()='Перейти в корзину']");
    }

    async clickBasketButton() {
        await this.page.waitForSelector(this.dropdownBasketButton, { state: 'visible' })
        await this.page.locator(this.dropdownBasketButton).hover(); 
        await this.page.locator(this.dropdownBasketButton).click();
    }

    async clickClearBasketButton() {
        await this.clearBasketButton.click();
    }

    async getBooksCount() {
        await this.page.waitForSelector(this.booksInBasketCount);
        return await this.page.locator(this.booksInBasketCount).textContent();
    }

    async clickGoToBasket() {
        await this.goToBasketButton.click();
    }
}

module.exports = BasketPopupComponent;