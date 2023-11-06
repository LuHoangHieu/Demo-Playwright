import { test, expect } from '@playwright/test'

test.describe('Validate UI Swag Labs', () => {

    test.beforeEach('Open start URL', async ({ page }) => {
        await page.goto('/');
        await page.locator('.login_credentials_wrap-inner').isVisible();
    });

    test('Login unsuccessful', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret');
        await page.locator('#login-button').click();
        await page.locator('.error-message-container').isVisible();
        await page.locator('text=Epic sadface: Username and password do not match any user in this service').isVisible();

        // // login success
        // await page.getByPlaceholder('Password').clear();
        // await page.getByPlaceholder('Password').fill('secret_sauce');
        // await page.locator('#login-button').click();

        // // check fields info
        // // title header
        // await expect(page.getByText('Swag Labs')).toBeVisible();

        // // shopping cart
        // await expect(page.locator('.shopping_cart_link')).toBeVisible();

        // // menu
        // await page.getByRole('button', { name: 'Open Menu' }).click();

        // // item list menu
        // await expect(page.getByRole('link', { name: 'All Items' })).toBeVisible();
        // await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
        // await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
        // await expect(page.getByRole('link', { name: 'Reset App State' })).toBeVisible();

        // // close menu
        // await page.getByRole('button', { name: 'Close Menu' }).click();

        // // title page
        // await expect(page.locator('text=Products')).toBeVisible();

        // // filter
        // await expect(page.locator('.select_container')).toBeVisible();

        // // list options of filter
        // await expect(page.locator('.product_sort_container > option')).toHaveCount(4);

        // // data products
        // await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);

        // // image
        // await expect(page.locator('.inventory_item > .inventory_item_img > a > .inventory_item_img')).toHaveCount(6);

        // // product name
        // await expect(page.locator('a > .inventory_item_name')).toHaveCount(6);

        // // product description
        // await expect(page.locator('.inventory_item_label > .inventory_item_desc')).toHaveCount(6);

        // // price
        // await expect(page.locator('.pricebar > .inventory_item_price')).toHaveCount(6);

        // // button Add to cart
        // await expect(page.locator('.pricebar > button')).toHaveCount(6);

        // //footer
        // await expect(page.getByRole('link', { name: 'Twitter' })).toBeVisible();
        // await expect(page.locator('.social_facebook')).toBeVisible();
        // await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
        // await expect(page.locator('text=© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')).toBeVisible();

        // // Add product
        // await page.locator('.pricebar > button').first().click();
        // await expect(page.locator('text=Remove')).toBeVisible();
        // await expect(page.locator('.shopping_cart_badge', { hasText: '1' })).toBeVisible();
        // await page.locator('.pricebar > button').last().click();
        // await expect(page.locator('text=Remove')).toHaveCount(2);
        // await expect(page.locator('.shopping_cart_badge', { hasText: '2' })).toBeVisible();

        // // shopping cart
        // await page.locator('.shopping_cart_link').click();
        // await expect(page.locator('text=Your Cart')).toBeVisible();

        // // check products list items
        // await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);

        // // check button Continue Shopping and Checkout
        // await expect(page.locator('#continue-shopping')).toBeVisible();
        // await expect(page.locator('#checkout')).toBeVisible();

        // // Remove product
        // await page.getByRole('button', { name: 'Remove' }).first().click();
        // await expect(page.locator('.cart_list > .cart_item')).toHaveCount(1);

        // // click button Continue Shopping and add product
        // await page.locator('#continue-shopping').click();
        // await page.locator('.pricebar > button').first().click();

        // // click shopping cart and check data
        // await page.locator('.shopping_cart_link').click();
        // await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);

        // // checkout
        // await page.locator('#checkout').click();
        // await expect(page.locator('text=Checkout: Your Information')).toBeVisible();

        // // check fields info and click Cancel button
        // await expect(page.locator('.form_group')).toHaveCount(3);
        // await expect(page.locator('#continue')).toBeVisible();
        // await page.locator('#cancel').click();
        // await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);
        // await expect(page.locator('#continue-shopping')).toBeVisible();
        // await expect(page.locator('#checkout')).toBeVisible();

        // // checkout input field First Name, Last Name valid and Zip Code null
        // await page.locator('#checkout').click();
        // await expect(page.locator('text=Checkout: Your Information')).toBeVisible();
        // await page.getByPlaceholder('First Name').fill('hieu');
        // await page.getByPlaceholder('Last Name').fill('lu');
        // await page.locator('#continue').click();
        // await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();

        // // input all fields valid and click Cancel button
        // await page.locator('[data-test="postalCode"]').fill('2006');
        // await page.locator('#continue').click();
        // await expect(page.locator('text=Checkout: Overview')).toBeVisible();
        // await expect(page.locator('.cart_list > .cart_item')).toHaveCount(2);
        // await expect(page.locator('#checkout_summary_container > div > .summary_info > div')).toHaveCount(9);
        // await expect(page.locator('#finish')).toBeVisible();
        // await page.locator('#cancel').click();

        // // check home page
        // await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);

        // // checkout successful
        // await page.locator('.shopping_cart_link').click();
        // await page.locator('#checkout').click();
        // await page.getByPlaceholder('First Name').fill('hieu');
        // await page.getByPlaceholder('Last Name').fill('lu');
        // await page.locator('[data-test="postalCode"]').fill('2006');
        // await page.locator('#continue').click();
        // await page.locator('#finish').click();

        // // check message
        // await expect(page.locator('text=Checkout: Complete!')).toBeVisible();
        // await expect(page.locator('text=Thank you for your order!')).toBeVisible();
        // await expect(page.locator('text=Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
        // await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
        // await page.getByRole('button', { name: 'Back Home' }).click();

        // // check home page
        // await expect(page.locator('.inventory_list > .inventory_item')).toHaveCount(6);
    });

    test('Login successful', async ({ page }) => {
        await page.getByPlaceholder('Username').clear();
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').clear();
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.locator('#login-button').click();

        // check fields info
        // title header
        await expect(page.getByText('Swag Labs')).toBeVisible();

        // shopping cart
        await expect(page.locator('.shopping_cart_link')).toBeVisible();

        // menu
        await page.getByRole('button', { name: 'Open Menu' }).click();
    });

    test('Menu', async ({ page }) => {
        // menu
        await page.getByRole('button', { name: 'Open Menu' }).click();

        // item list menu
        await expect(page.getByRole('link', { name: 'All Items' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Reset App State' })).toBeVisible();

        // close menu
        await page.getByRole('button', { name: 'Close Menu' }).click();
    });
});