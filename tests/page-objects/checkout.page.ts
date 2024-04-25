import { Page, expect } from "@playwright/test";
import { Products } from "./components/products.component";

interface TicketDetails {
    cardInformation: string;
    shippingInformation: string;
    priceTotal: string;
    tax: string;
    total: string;
}

class YourInformationPage{
    page:Page;
    
    constructor(page:Page){
        this.page = page
    }

    elements = {
        titleLabel:     ()=> this.page.locator('span[data-test="title"]', {hasText:'Checkout: Your Information'}),
        firstNameBox:   ()=> this.page.locator('input[data-test="firstName"]'),
        lastNameBox:    ()=> this.page.locator('input[data-test="lastName"]'),
        postalCodeBox:  ()=> this.page.locator('input[data-test="postalCode"]'),
        continueButton: ()=> this.page.locator('input[data-test="continue"]'),
        cancelButton:   ()=> this.page.locator('button[data-test="cancel"]')
    }

    public async fillForm(userInformation:{firstName?:string, lastName?:string, postalCode?:string}): Promise<void>{
        userInformation.firstName  = userInformation.firstName?  userInformation.firstName  : 'not set'
        userInformation.lastName   = userInformation.lastName?   userInformation.lastName   : 'not set'
        userInformation.postalCode = userInformation.postalCode? userInformation.postalCode : 'not set'
        await this.elements.firstNameBox().fill(userInformation.firstName)
        await this.elements.lastNameBox().fill(userInformation.lastName)
        await this.elements.postalCodeBox().fill(userInformation.postalCode)
    }

    public async clickCancel():Promise<void>{
        await this.elements.cancelButton().click()
    }

    public async clickContinue(): Promise<void>{
        await this.elements.continueButton().click()
    }

    public async verifyPageTitle(expectedPageTitle:string='Checkout: Your Information'):Promise<void>{
        const pageTitle = await this.elements.titleLabel().innerText()
        expect(pageTitle).toEqual(expectedPageTitle)
    }
}

class OverviewPage{
    page:Page;
    products:Products

    constructor(page:Page){
        this.page = page
        this.products = new Products(page)
    }

    elements = {
        titleLabel:             ()=> this.page.locator('span[data-test="title"]', {hasText: 'Checkout: Overview'}),
        cardInformation:        ()=> this.page.locator('div[data-test="payment-info-value"]'),
        shippingInformation:    ()=> this.page.locator('div[data-test="shipping-info-value"]'),
        priceTotal:             ()=> this.page.locator('div[data-test="subtotal-label"]'),
        tax:                    ()=> this.page.locator('div[data-test="tax-label"]'),
        total:                  ()=> this.page.locator('div[data-test="total-label"]'),
        finishButton:           ()=> this.page.locator('button[data-test="finish"]'),
        cancelButton:           ()=> this.page.locator('button[data-test="cancel"]')
    }

    public async verifyPageTitle():Promise<void>{
        console.log(await this.elements.titleLabel().innerText())
        await expect(this.elements.titleLabel()).toBeVisible()
    }

    public async getReport():Promise<{
        cardInformation:string, 
        shippingInformation:string, 
        priceTotal:string, 
        tax:string, 
        total:string}>{
        return {
            cardInformation:        await this.elements.cardInformation().innerText(),
            shippingInformation:    await this.elements.shippingInformation().innerText(),
            priceTotal:             await this.elements.priceTotal().innerText(),
            tax:                    await this.elements.tax().innerText(),
            total:                  await this.elements.total().innerText()
        }
    }

    public async clickCancel():Promise<void>{
        await this.elements.cancelButton().click()
    }

    public async clickFinish():Promise<void>{
        await this.elements.finishButton().click()
    }

    public async verifyAttachedProducts(expectedProductsInTheCart: {title: string, price: string}[]):Promise<void>{
        let productsInTheCart = await this.products.getListedProducts()
        expect(productsInTheCart).toEqual(expectedProductsInTheCart)
    }
    
    public async verifyTicketDetails(expectedTicketDetails:TicketDetails):Promise<void>{
        const ticketDetails = await this.getReport()
        expect(ticketDetails).toEqual(expectedTicketDetails)
    }
}

class CompletePage{
    page:Page
    
    constructor(page:Page){
        this.page = page
    }

    elements = {
        titleLabel:     ()=> this.page.locator('span[data-test="title"]', {hasText:'Checkout: Complete!'}),
        headerLabel:    ()=> this.page.locator('h2[data-test="complete-header"]'),
        bodyText:       ()=> this.page.locator('div[data-test="complete-text"]'),
        backHomeButton: ()=> this.page.locator('button[data-test="back-to-products"]')
    }

    public async getTitle():Promise<string>{
        return await this.elements.titleLabel().innerText()
    }

    public async getHeaderText():Promise<string>{
        return await this.elements.headerLabel().innerText()
    }

    public async getBodyText():Promise<string>{
        return await this.elements.bodyText().innerText()
    }

    public async clickBackHome():Promise<void>{
        await this.elements.backHomeButton().click()
    }

    public async verifyPageTitle():Promise<void>{
        await expect(this.elements.titleLabel()).toBeVisible()
    }

    public async verifyCompleteMessage(expectedTitle:string, expectedBody:string){
        expect(await this.getHeaderText()).toEqual(expectedTitle)
        expect(await this.getBodyText()).toEqual(expectedBody)
    }
}

export {YourInformationPage, OverviewPage, CompletePage}