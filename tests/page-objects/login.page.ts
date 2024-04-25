import { Page, expect } from "@playwright/test"

class LoginPage{

    private page:Page

    constructor(page:Page){
        this.page = page
    }

    elements = {
        usernameBox:        ()=> this.page.locator('input[data-test="username"]'),
        passwordBox:        ()=> this.page.locator('input[data-test="password"]'),
        loginButton:        ()=> this.page.locator('input[data-test="login-button"]'),
        pageTitle:          ()=> this.page.locator('div.login_logo'),
        errorMessageLabel:  ()=> this.page.locator('h3[data-test="error"]')
    }

    public async login2App(username:string, password:string): Promise<void>{
        await this.elements.usernameBox().fill(username)
        await this.elements.passwordBox().fill(password)
        await this.elements.loginButton().click()
    }

    public async verifyPageTitle(expectedValue:string): Promise<void>{
        const currentValue = this.elements.pageTitle().innerText()
        expect(currentValue).toEqual(expectedValue)
    }

    public async verifyErrorMessage(expectedValue:string): Promise<void>{
        const currentValue = await this.elements.errorMessageLabel().innerText()
        expect(currentValue).toEqual(expectedValue)
    }
}

export {LoginPage}