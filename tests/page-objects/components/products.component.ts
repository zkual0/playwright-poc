import { Page } from "@playwright/test";

class Products{
    page:Page;
    
    constructor(page:Page){
        this.page = page
    }

    elements = {
        productContainers:()                    => this.page.locator('div[data-test="inventory-item"]'),
        productContainer: (name:string)         => this.page.locator('div[data-test="inventory-item"]', {hasText: name}),
        addToCartButton:  (productName:string)  => this.elements.productContainer(productName).locator('button', {hasText:'Add to cart'}),
        removeButton:     (productName:string)  => this.elements.productContainer(productName).locator('button', {hasText:'Remove'}),
        priceLabel:       (productName:string)  => this.elements.productContainer(productName).locator('div[data-test="inventory-item-price"]'),
        descriptionLabel: (productName:string)  => this.elements.productContainer(productName).locator('div[data-test="inventory-item-desc"]'),
        titleLabel:       (productName:string)  => this.elements.productContainer(productName).locator('div[data-test="inventory-item-name"]')
    }
    
    /**
     * get price
     * @param productName 
     * @returns 
     */
    public async getPrice(productName:string) : Promise<string> {
        return await this.elements.priceLabel(productName).innerText()
    }

    /**
     * get description
     * @param productName 
     * @returns 
     */
    public async getDescription(productName:string): Promise<string>{
        return await this.elements.descriptionLabel(productName).innerText()
    }

    /**
     * get title
     * @param productName 
     * @returns 
     */
    public async getTitle(productName:string): Promise<string>{
        return await this.elements.titleLabel(productName).innerText()
    }

    /**
     * click add to cart button
     * @param productName 
     * @returns 
     */
    public async clickAddToCart(productName:string): Promise<void>{
        return await this.elements.addToCartButton(productName).click()
    }

    /**
     * click remove button
     * @param productName 
     * @returns 
     */
    public async clickRemove(productName:string): Promise<void>{
        return await this.elements.removeButton(productName).click()
    }

    /**
     * get a listed products
     * @returns 
     */
    public async getListedProducts(opts:{onlyName?:boolean, onlyPrice?:boolean}={}): Promise<{ title: string, price: string }[]> {
        const products = await this.elements.productContainers()
        return await products.evaluateAll((nodes) => nodes.map((node) => {
            const titleElement = node.querySelector('div[data-test="inventory-item-name"]')?.textContent
            const priceElement = node.querySelector('div[data-test="inventory-item-price"]')?.textContent
            return {
                title: (titleElement)? titleElement.trim() : '',
                price: (priceElement)? priceElement.trim() : ''
            };
        }))
    }

    public async getProductNames(): Promise<string[]>{
        const products = await this.getListedProducts()
        return products.map((prod)=>{return prod.title})
    }

    public async getProductPrices(): Promise<string[]>{
        const products = await this.getListedProducts()
        return products.map((prod)=>{return prod.price})
    }
}

export {Products}