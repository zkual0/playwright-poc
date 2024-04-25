import { Page } from "@playwright/test"

class TopNavigationBar {

    page: Page

    constructor(page: Page) {
        this.page = page
    }

    public elements = {
        shoppingCartIcon: () => this.page.locator('a[data-test="shopping-cart-link"]'),
        burgerMenu: () => this.page.locator('button#react-burger-menu-btn')
    }

    public async clickMenu(): Promise<void> {
        await this.elements.burgerMenu().click()
    }

    public async clickShoppingCartIcon(): Promise<void> {
        await this.elements.shoppingCartIcon().click()
    }

    public async getShoppingCartText(): Promise<string> {
        return await this.elements.shoppingCartIcon().innerText()
    }
}

export { TopNavigationBar }