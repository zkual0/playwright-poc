import { Page, expect }     from "@playwright/test";
import { TopNavigationBar } from "./components/top-navigation-bar.component";
import { Products }         from "./components/products.component";

class DashboardPage{

    private readonly page:Page;
    public readonly products:Products;
    public readonly topNavigationBar:TopNavigationBar

    constructor(page:Page){
        this.page               = page
        this.products           = new Products(page)
        this.topNavigationBar   = new TopNavigationBar(page)    
    }

    elements = {
        titleLabel:     ()=> this.page.locator('span[data-test="title"]', {hasText: 'Products'})
    }

    public async verifyPageTitle():Promise<void>{
        await expect(this.elements.titleLabel()).toBeVisible()
    }

    public async verifyListedProducts(expectedProductNames:string[]=[]):Promise<void>{
        const currentProducts = await this.products.getListedProducts()
        let productNames = currentProducts.map((prod)=>{return prod.title})
        expect(productNames).toEqual(expectedProductNames)
    }

    public async verifyProductsAddedCount(expectedNumber):Promise<void>{
        expect(await this.topNavigationBar.getShoppingCartText()).toEqual(expectedNumber)
    }
}

export {DashboardPage}