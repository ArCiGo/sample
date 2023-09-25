import { test, expect } from '@playwright/test';
import { Customer } from '../../../../e2e/ui/customer/Customer';

test.beforeEach(async ({ page }) => {
    const customer = new Customer(page);

    await test.step('STEP 0: Open Login page', async () => {
        await customer.slLoginPage.goTo();
    });
});

test.describe('Customer logout test', () => {
    test('As a user I should be able to logout into the store', async ({ page }) => {
        const customer = new Customer(page);
        
        await test.step('STEP 1: Login into the platform', async () => {
            await customer.slLoginPage.fillLoginForm(process.env.USERNAME as string, process.env.PASSWORD as string);
            
            expect(await customer.slProductPage.headerIsDisplayed()).toBeTruthy();
        });

        await test.step('STEP 2: Logout the platform', async () => {
            await customer.slProductPage.clickOnMenuButton();
            await customer.slProductPage.clickOnLogoutLinkButton();

            expect(await customer.slLoginPage.botImageIsDisplayed()).toBeTruthy();
        });
    });
});