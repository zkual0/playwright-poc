import { test }             from "@playwright/test";
import { LoginPage }        from "./page-objects/login.page";
import { DashboardPage }    from "./page-objects/dashboard.page";


test.describe('on Login page',()=>{
    
    test.beforeEach(async ({page})=>{
        await page.goto('https://www.saucedemo.com/')
    })

    test.describe('when using valid credentials', ()=>{
        test('user makes login successfully when using a fresh account', async ({page})=>{
            const loginPage     = new LoginPage(page)
            const dasboardPage  = new DashboardPage(page)

            const username      = 'standard_user'
            const password      = 'secret_sauce'
            
            await loginPage.login2App(username, password)
            await dasboardPage.verifyPageTitle()
        })
    })

    test.describe('when using wrong credentials', ()=>{
        test('the app shows a specific error message when username is empty', async({page})=>{
            // [page objects]
            const loginPage             = new LoginPage(page)
            // [test variables]
            const username              = ''
            const password              = 'secret_sauce'
            const expectedErrorMessage  = 'Epic sadface: Username is required'
            
            // [test steps]
            await loginPage.login2App(username, password)
            await loginPage.verifyErrorMessage(expectedErrorMessage)
        })

        test('the app shows a specific error message when password is empty', async({page})=>{
            // [page objects]
            const loginPage             = new LoginPage(page)
            // [test variables]
            const username              = 'standard_user'
            const password              = ''
            const expectedErrorMessage  = 'Epic sadface: Password is required'
            
            // [test steps]
            await loginPage.login2App(username, password)
            await loginPage.verifyErrorMessage(expectedErrorMessage)
        })
        
        test('the app shows a specific error message when credentials are wrong', async({page})=>{
            // [page objects]
            const loginPage             = new LoginPage(page)
            // [test variables]
            const username              = 'asdasdasd'
            const password              = 'A$DA$DA$D'
            const expectedErrorMessage  = 'Epic sadface: Username and password do not match any user in this service'

            // [test steps]
            await loginPage.login2App(username, password)
            await loginPage.verifyErrorMessage(expectedErrorMessage)
        })

        test.describe('when using damaged credentials', ()=>{
            test.skip('the login shows a error message when the account is locked out', async({page})=>{})
            test.skip('the dashboard shows repeated product images', async({page})=>{})
            test.skip('the login shows a delay when has a performance_glitch_user' , async({page})=>{})
        })
    })
})

