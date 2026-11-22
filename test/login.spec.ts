import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { newUser } from '../utils/testData';

const EMAIL = process.env.TEST_EMAIL!;
const PASSWORD = process.env.TEST_PASSWORD!;

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.open();
  });

  test('wrong password shows an error', async () => {
    await login.login(EMAIL, 'wrong-password-123');
    await login.expectLoginError();
  });

  test('empty fields show validation messages', async () => {
    await login.submit();
    await login.expectFieldErrors();
  });

  test('very long email is rejected', async () => {
    await login.login('a'.repeat(100) + '@example.com', PASSWORD);
    await login.expectEmailError();
  });

  test('email without @ is rejected', async () => {
    await login.login('not-an-email', PASSWORD);
    await login.expectEmailError();
  });

  test('password with only spaces is rejected', async () => {
    await login.login(EMAIL, '     ');
    await login.expectLoginError();
  });

  test('freshly registered user can log in', async ({ page }) => {
    const user = newUser();
    const register = new RegisterPage(page);
    await register.open();
    await register.fillForm(user);
    await register.submit();
    await expect(page).toHaveURL(/auth\/login/);

    await login.login(user.email, user.password);
    await expect(page).toHaveURL(/account/);
  });

})

