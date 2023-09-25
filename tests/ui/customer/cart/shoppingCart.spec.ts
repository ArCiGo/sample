import { test, expect } from '@playwright/test';
import { Customer } from '../../../../e2e/ui/customer/Customer';

test.beforeEach(async ({ page }) => {
    const customer = new Customer(page);

    await test.step('STEP 0: Open Login page', async () => {
        await customer.slLoginPage.goTo();
    });
});

test.describe('Customer shopping cart tests', () => {
    test('As a user I should be able to print all items in the page', async ({ page }) => {
        const customer = new Customer(page);
        let items: string[] = ['Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack']

        await test.step('STEP 1: Login into the platform',async () => {
            await customer.slLoginPage.fillLoginForm(process.env.USERNAME as string, process.env.PASSWORD as string);
            
            expect(await customer.slProductPage.headerIsDisplayed()).toBeTruthy();
        });

        await test.step('STEP 2: Add items to cart', async () => {
            await customer.slProductPage.addItemsToCart(items);
            await customer.slProductPage.clickOnShoppingCartButton();
            
            expect(await customer.slCartPage.verifyItemsOnCart(items)).toBeTruthy();
        });

        await test.step('STEP 3: Add personal info to Information page', async () => {
            await customer.slCartPage.clickOnCheckoutButton();
            await customer.slCheckoutInformationPage.fillCheckoutForm('Armando', 'Cifuentes', '89000');
        });

        await test.step('STEP 4: Check Overview page before to pay', async () => {
            expect(await customer.slCheckoutOverviewPage.getTotalText()).toBe('Total: $49.66');
            
            await customer.slCheckoutOverviewPage.clickOnFinishButton();
        });

        await test.step('STEP 5: Purchase was successful!', async () => {
            expect(await customer.slCheckoutCompletePage.getThanksText()).toBe('THANK YOU FOR YOUR ORDER');
        });
    });
});