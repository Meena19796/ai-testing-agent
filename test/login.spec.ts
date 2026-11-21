import { test, expect } from '@playwright/test'
 
const LOGIN_URL = 'https://practicesoftwaretesting.com/auth/login'
const EMAIL = process.env.TEST_EMAIL!;
const PASSWORD = process.env.TEST_PASSWORD!;

test('Valid User Login', async ({ page }) => {
    await page.goto(LOGIN_URL)
    await page.locator('[data-test="email"]').fill(EMAIL)
    await page.locator('[data-test="password"]').fill(PASSWORD)
    await page.locator('[data-test="login-submit"]').click()
    await expect(page).toHaveURL(/account/);
})

test('wrong password shows an error', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.locator('[data-test="email"]').fill(EMAIL);
    await page.locator('[data-test="password"]').fill('wrong-password-123');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page.locator('[data-test="login-error"]')).toBeVisible();
});

test('empty fields show validation messages', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="email-error"]')).toBeVisible();
  await expect(page.locator('[data-test="password-error"]')).toBeVisible();
});