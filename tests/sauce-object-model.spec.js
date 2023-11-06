import { test, expect } from '@playwright/test';
import { LoginPage } from './utils';

test.describe('Validate UI Swag Labs', () => {
    test.beforeEach('Open start URL', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.gotoLogin();
        await page.locator('.login_credentials_wrap-inner').isVisible();
    });

    test('Login Unsuccessful', async ({ page }) => {
        const Login = new LoginPage(page);

        // username and password null
        await Login.loginUnsuccessful('', '');
        await page.locator('.error-message-container').isVisible();
        await page.locator('text=Epic sadface: Username is required').isVisible();

        // username null and password valid
        await Login.loginUnsuccessful('', 'secret_sauce');
        await page.locator('.error-message-container').isVisible();
        await page.locator('text=Epic sadface: Username is required').isVisible();

        // username valid and password null
        await Login.loginUnsuccessful('standard_user', '');
        await page.locator('.error-message-container').isVisible();
        await page.locator('text=Epic sadface: Password is required').isVisible();

        // username valid and password invalid
        await Login.loginUnsuccessful('standard_user', 'secret');
        await page.locator('.error-message-container').isVisible();
        await page.locator('text=Epic sadface: Username and password do not match any user in this service').isVisible();

        // username invalid and password valid
        await Login.loginUnsuccessful('standard', 'secret_sauce');
        await page.locator('.error-message-container').isVisible();
        await page.locator('text=Epic sadface: Username and password do not match any user in this service').isVisible();
    });

    test('Login Successful', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await expect(page.getByText('Swag Labs')).toBeVisible();
        await expect(page.locator('.shopping_cart_link')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
        await expect(page.locator('text=Products')).toBeVisible();
        await expect(page.locator('.select_container')).toBeVisible();
        await expect(page.locator('.product_sort_container > option')).toHaveCount(4);
        await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);
    });

    test('Validate UI Menu', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await expect(page.getByRole('link', { name: 'All Items' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Reset App State' })).toBeVisible();
        await page.getByRole('button', { name: 'Close Menu' }).click();
    });

    test('Validate UI Products Description', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);
        await expect(page.locator('.inventory_item > .inventory_item_img > a > .inventory_item_img')).toHaveCount(6);
        await expect(page.locator('a > .inventory_item_name')).toHaveCount(6);
        await expect(page.locator('.inventory_item_label > .inventory_item_desc')).toHaveCount(6);
        await expect(page.locator('.pricebar > .inventory_item_price')).toHaveCount(6);
        await expect(page.locator('.pricebar > button')).toHaveCount(6);
    });

    test('Validate UI Footer', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await expect(page.getByRole('link', { name: 'Twitter' })).toBeVisible();
        await expect(page.locator('.social_facebook')).toBeVisible();
        await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
        await expect(page.locator('text=© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')).toBeVisible();
    });

    test('Add product to cart successfully', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await page.locator('.pricebar > button').first().click();
        await expect(page.locator('text=Remove')).toBeVisible();
        await expect(page.locator('.shopping_cart_badge', { hasText: '1' })).toBeVisible();
        await page.locator('.pricebar > button').last().click();
        await expect(page.locator('text=Remove')).toHaveCount(2);
        await expect(page.locator('.shopping_cart_badge', { hasText: '2' })).toBeVisible();
    });

    test('Verify Products list in Cart item', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await page.locator('.pricebar > button').first().click();
        await page.locator('.pricebar > button').last().click();

        // cart item
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('text=Your Cart')).toBeVisible();
        await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);
        await expect(page.locator('#continue-shopping')).toBeVisible();
        await expect(page.locator('#checkout')).toBeVisible();
        await page.getByRole('button', { name: 'Remove' }).first().click();
        await expect(page.locator('.cart_list > .cart_item')).toHaveCount(1);
        await page.locator('#continue-shopping').click();
        await page.locator('.pricebar > button').first().click();
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);
    });

    test('Checkout Unsuccessfully', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await page.locator('.pricebar > button').first().click();
        await page.locator('.pricebar > button').last().click();
        await page.locator('.shopping_cart_link').click();

        // checkout
        await page.locator('#checkout').click();
        await expect(page.locator('text=Checkout: Your Information')).toBeVisible();
        await expect(page.locator('.form_group')).toHaveCount(3);
        await expect(page.locator('#continue')).toBeVisible();
        await expect(page.locator('#cancel')).toBeVisible();

        // First Name, Last Name, Zip Code null
        await page.locator('#continue').click();
        await expect(page.locator('text=Error: First Name is required')).toBeVisible();

        // First Name valid, Last Name and Zip Code null
        await page.getByPlaceholder('First Name').fill('hieu');
        await page.locator('#continue').click();
        await expect(page.locator('text=Error: Last Name is required')).toBeVisible();

        // First Name and Last Name valid and Zip Code null
        await page.getByPlaceholder('Last Name').fill('lu');
        await page.locator('#continue').click();
        await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();
    });

    test('Checkout Successful and Click Cancel button', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await page.locator('.pricebar > button').first().click();
        await page.locator('.pricebar > button').last().click();
        await page.locator('.shopping_cart_link').click();

        // checkout
        await page.locator('#checkout').click();
        await page.getByPlaceholder('First Name').fill('hieu');
        await page.getByPlaceholder('Last Name').fill('lu');
        await page.locator('[data-test="postalCode"]').fill('2006');
        await page.locator('#continue').click();
        await expect(page.locator('text=Checkout: Overview')).toBeVisible();
        await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);
        await expect(page.locator('#checkout_summary_container > div > .summary_info > div')).toHaveCount(9);
        await expect(page.locator('#finish')).toBeVisible();
        await page.locator('#cancel').click();

        // check HomePage
        await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);
    });

    test('Checkout Successful and Click Finish button', async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.loginSuccessful('standard_user', 'secret_sauce');
        await page.locator('.pricebar > button').first().click();
        await page.locator('.pricebar > button').last().click();
        await page.locator('.shopping_cart_link').click();

        // checkout
        await page.locator('#checkout').click();
        await page.getByPlaceholder('First Name').fill('hieu');
        await page.getByPlaceholder('Last Name').fill('lu');
        await page.locator('[data-test="postalCode"]').fill('2006');
        await page.locator('#continue').click();
        await page.locator('#finish').click();
        await expect(page.locator('text=Checkout: Complete!')).toBeVisible();
        await expect(page.locator('text=Thank you for your order!')).toBeVisible();
        await expect(page.locator('text=Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
        await page.getByRole('button', { name: 'Back Home' }).click();

        // check HomePage
        await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);
    });
});