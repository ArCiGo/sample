import { Page } from '@playwright/test';
import { SLLoginPage } from './pages/login/SLLoginPage';
import { SLProductPage } from './pages/product/SLProductPage';
import { SLCartPage } from './pages/cart/SLCartPage';
import { SLCheckoutInformationPage } from './pages/checkout/SLCheckoutInformationPage';
import { SLCheckoutOverviewPage } from './pages/checkout/SLCheckoutOverviewPage';
import { SLCheckoutCompletePage } from './pages/checkout/SLCheckoutCompletePage';

export class Customer {
    /* Creating the page instances */
    // Login
    private readonly _slLoginPage: SLLoginPage;
    // Product
    private readonly _slProductPage: SLProductPage;
    // Cart
    private readonly _slCartPage: SLCartPage;
    // Checkout
    private readonly _slCheckoutInformationPage: SLCheckoutInformationPage;
    private readonly _slCheckoutOverviewPage: SLCheckoutOverviewPage;
    private readonly _slCheckoutCompletePage: SLCheckoutCompletePage;

    // Constructor
    constructor(page: Page) {
        // Login
        this._slLoginPage = new SLLoginPage(page);
        // Product
        this._slProductPage = new SLProductPage(page);
        // Cart
        this._slCartPage = new SLCartPage(page);
        // Checkout
        this._slCheckoutInformationPage = new SLCheckoutInformationPage(page);
        this._slCheckoutOverviewPage = new SLCheckoutOverviewPage(page);
        this._slCheckoutCompletePage = new SLCheckoutCompletePage(page);
    }

    /* Getting the page instances */
    // Login
    public get slLoginPage(): SLLoginPage {
        return this._slLoginPage;
    }

    // Product
    public get slProductPage(): SLProductPage {
        return this._slProductPage;
    }

    // Cart
    public get slCartPage(): SLCartPage {
        return this._slCartPage;
    }

    // Checkout
    public get slCheckoutInformationPage(): SLCheckoutInformationPage {
        return this._slCheckoutInformationPage;
    }

    public get slCheckoutOverviewPage(): SLCheckoutOverviewPage {
        return this._slCheckoutOverviewPage;
    }

    public get slCheckoutCompletePage(): SLCheckoutCompletePage {
        return this._slCheckoutCompletePage;
    }
}