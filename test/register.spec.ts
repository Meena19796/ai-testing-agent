import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { newUser } from '../utils/testData';

test.describe('Register', () => {
  let register: RegisterPage;

  test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.open();
  });

  test('new user can register', async ({ page }) => {
    await register.fillForm(newUser());
    await register.submit();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('empty form shows errors', async ({ page }) => {
    await register.submit();
    await expect(page).toHaveURL(/auth\/register/);
  });

  test('weak password is rejected', async ({ page }) => {
    await register.fillForm({ ...newUser(), password: '123' });
    await register.submit();
    await expect(page).toHaveURL(/auth\/register/);
  });
});