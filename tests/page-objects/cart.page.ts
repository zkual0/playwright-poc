import { Page, expect }     from "@playwright/test";
import { Products } from "./components/products.component";

class CartPage{
    
    private readonly page:Page
    public readonly  products:Products

    constructor(page:Page){
        this.page       = page
        this.products   = new Products(page)
    }

    elements = {
        titleLabel:             ()=> this.page.locator('span[data-test="title"]', {hasText:'Your Cart'}),
        continueShoppingButton: ()=> this.page.locator('button[data-test="continue-shopping"'),
        checkOutButton:         ()=> this.page.locator('button[data-test="checkout"]')

    }
    public async clickContinueShopping():Promise<void>{
        this.elements.continueShoppingButton().click()
    }

    public async clickCheckout():Promise<void>{
        this.elements.checkOutButton().click()
    }

    public async verifyPageTitle():Promise<void>{
        await expect(this.elements.titleLabel()).toBeVisible()
    }

    public async verifyAttachedProducts(expectedProductsInTheCart: { title: string, price: string }[]): Promise<void> {
        const productsInTheCart = await this.products.getListedProducts()
        expect(productsInTheCart).toEqual(expectedProductsInTheCart)
    }
}

export {CartPage}