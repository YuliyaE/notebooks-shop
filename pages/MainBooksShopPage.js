const BasketPopupComponent = require('../pages/BasketPopupComponent.js');
const util = require('node:util');

class MainBooksShopPage extends BasketPopupComponent {

    constructor(page) {
        super(page);

        this.buyBookButton = 'button.actionBuyProduct';
        this.bookWithoutDiscount = '.note-item:not([class*="hasDiscount"])';
        this.bookWithDiscount = '.note-item.hasDiscount';
        this.buyBookWithDiscountButton = this.page.locator(`${this.bookWithDiscount} ${this.buyBookButton}`);
        this.buyBookWithoutDiscountButton = this.page.locator(`${this.bookWithoutDiscount} ${this.buyBookButton}`);
        this.enterLabel = '[name=product-enter-count]';
        this.pageButton = 'a[data-page-number="%s"]';
        this.activePageButton = '.page-item.active [data-page-number="%s"]';
    }

    async clickBuyBookButton(withDiscount = false, bookNumber = 1) {
        const buyBookLocator = withDiscount ? this.buyBookWithDiscountButton.nth(bookNumber - 1) : this.buyBookWithoutDiscountButton.nth(bookNumber - 1);
        await buyBookLocator.click();
    }

    async clickBuyByBookNumber(booksNumber) {
        await this.page.locator(this.buyBookButton).nth(booksNumber).click();
    }

    async goToPage(pageNumber) {
        await this.page.locator(util.format(this.pageButton, pageNumber)).click();
        await this.page.waitForSelector(util.format(this.activePageButton, pageNumber), { state: 'visible' })
    }

    async enterBookCount(booksAmountForEntering, withDiscount, productNumber) {
        const bookEnterField = this.page.locator(`${withDiscount ? this.bookWithDiscount : this.bookWithoutDiscount} ${this.enterLabel}`).nth(productNumber - 1);
        await bookEnterField.fill('');
        await bookEnterField.fill(booksAmountForEntering.toString());
    }

}

module.exports = MainBooksShopPage;