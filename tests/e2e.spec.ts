import { test }             from "@playwright/test";
import { LoginPage }        from "./page-objects/login.page";
import { DashboardPage }    from "./page-objects/dashboard.page";
import { CartPage }         from "./page-objects/cart.page";
import { OverviewPage, 
        YourInformationPage, 
        CompletePage }      from "./page-objects/checkout.page";


test.describe('on Sauce Demo system',()=>{
    
    test.beforeEach('before each', async ({page})=>{
        await page.goto('https://saucedemo.com')
    })

    test('a user is able to buy a product', async ({page})=>{
        //#region page objects
        const loginPage           = new LoginPage(page)
        const dasboardPage        = new DashboardPage(page)
        const cartPage            = new CartPage(page)
        const yourInformationPage = new YourInformationPage(page)
        const overviewPage        = new OverviewPage(page)
        const completePage        = new CompletePage(page)
        //#endregion
        //#region test variables
        const testData = {
            loginPage: {
                username: 'standard_user',
                password: 'secret_sauce'
            },
            productsPage: {
                product1: 'Sauce Labs Backpack',
                product2: 'Sauce Labs Bike Light'
            },
            checkoutPage: {
                userInformation: { 
                    firstName: 'Fantastic', 
                    lastName: 'MrJFoxx' 
                }
            }
        }

        let expectedData = {
            dashboardPage: {
                listedProducts: [
                    'Sauce Labs Backpack',
                    'Sauce Labs Bike Light',
                    'Sauce Labs Bolt T-Shirt',
                    'Sauce Labs Fleece Jacket',
                    'Sauce Labs Onesie',
                    'Test.allTheThings() T-Shirt (Red)'],
                amountOfProductsAdded: '2',
            },
            cartPage: {
                addedProducts: [
                    { title: 'Sauce Labs Backpack',     price: '$29.99' },
                    { title: 'Sauce Labs Bike Light',   price: '$9.99' }
                ],
            },
            checkoutPage: {
                ticketDetails: {
                    cardInformation:        'SauceCard #31337',
                    shippingInformation:    'Free Pony Express Delivery!',
                    priceTotal:             'Item total: $39.98',
                    tax:                    'Tax: $3.20',
                    total:                  'Total: $43.18'
                },
            },
            completePage: {
                header: 'Thank you for your order!',
                body:   'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
            }
        }
        //#endregion
        //#region test scenario
        // [login page]: making login
        await loginPage.login2App(testData.loginPage.username, testData.loginPage.password)
        await dasboardPage.verifyPageTitle()
        
        // [dashboard page]: adding a couple of products
        await dasboardPage.verifyListedProducts(expectedData.dashboardPage.listedProducts)
        await dasboardPage.products.clickAddToCart(testData.productsPage.product1)
        await dasboardPage.products.clickAddToCart(testData.productsPage.product2)
        await dasboardPage.verifyProductsAddedCount(expectedData.dashboardPage.amountOfProductsAdded)
        // [dashboard page]: navigating to next page
        await dasboardPage.topNavigationBar.clickShoppingCartIcon()
        await cartPage.verifyPageTitle()

        // [cart page]: verifying listed products in the cart
        await cartPage.verifyAttachedProducts(expectedData.cartPage.addedProducts)
        // [cart page]: navigating to next page
        await cartPage.clickCheckout()
        await yourInformationPage.verifyPageTitle()

        // [checkout: your information page]: submitting user information
        await yourInformationPage.fillForm(testData.checkoutPage.userInformation)
        // [checkout: your information page]: navigating to next page
        await yourInformationPage.clickContinue()
        await overviewPage.verifyPageTitle()

        // [checkout: overview page]: making sure collected information is right
        await overviewPage.verifyAttachedProducts(expectedData.cartPage.addedProducts)  
        await overviewPage.verifyTicketDetails(expectedData.checkoutPage.ticketDetails)
        // [checkout: overview page]: navigating to next page
        await overviewPage.clickFinish()
        await completePage.verifyPageTitle()

        // [checkout: complete page]: verifying final confirmation message
        const expectedTitle     = expectedData.completePage.header
        const expectedBody  = expectedData.completePage.body
        await completePage.verifyCompleteMessage(expectedTitle, expectedBody)
        // [checkout: complete page]: navigating to next page
        await completePage.clickBackHome()
        await dasboardPage.verifyPageTitle()
        //#endregion
    })
})


