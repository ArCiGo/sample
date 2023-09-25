import { test, expect } from '@playwright/test';
import { Customer } from '../../../../e2e/ui/customer/Customer';
import { Messages } from '../../../../constants/Messages';

test.beforeEach(async ({ page }) => {
    const customer = new Customer(page);

    await test.step('STEP 0: Open Login page', async () => {
        await customer.slLoginPage.goTo();
    });
});

test.describe('Customer login tests', () => {
    test('As a user I should be able to login into the store', async ({ page }) => {
        const customer = new Customer(page);

        await test.step('STEP 1: Login into the platform', async () => {
            await customer.slLoginPage.fillLoginForm(process.env.USERNAME as string, process.env.PASSWORD as string);
            
            expect(await customer.slProductPage.headerIsDisplayed()).toBeTruthy();
        });
    });

    test('As a user I shouldn\'t be able to login into the store using a locked username', async ({ page }) => {
        const customer = new Customer(page);

        await test.step('STEP 1: Login into the platform', async () => {
            await customer.slLoginPage.fillLoginForm(process.env.LOCKED_USERNAME as string, process.env.PASSWORD as string);

            expect(await customer.slLoginPage.getErrorMessage()).toBe(Messages.lockedOutMessage);
        });
    });

    test('As a user I shouldn\'t be able to login into the store with invalid credentials', async({ page }) => {
        const customer = new Customer(page);

        await test.step('STEP 1: Login into the platform', async () => {
            await customer.slLoginPage.fillLoginForm(process.env.INVALID_USERNAME as string, process.env.INVALID_PASSQORD as string);

            expect(await customer.slLoginPage.getErrorMessage()).toBe(Messages.invalidCredentialsMessage);
        });
    });

    test('As a user I shouldn\'t be able to login into the store without passwords', async({ page }) => {
        const customer = new Customer(page);

        await test.step('STEP 1: Login into the platform', async () => {
            await customer.slLoginPage.fillLoginForm(process.env.USERNAME as string, '');

            expect(await customer.slLoginPage.getErrorMessage()).toBe(Messages.passwordMessage);
        });
    });

    test('as a user I shouldn\'t be able to login into the store without username', async({ page }) => {
        const customer = new Customer(page);

        await test.step('STEP 1: Login into the platform', async () => {
            await customer.slLoginPage.fillLoginForm('', process.env.PASSWORD as string);

            expect(await customer.slLoginPage.getErrorMessage()).toBe(Messages.usernameMessage);
        });
    });
});