import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { newUser } from '../utils/testData';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    const user = await newUser();
    const register = new RegisterPage(page);
    await register.open();
    await register.fillForm(user);
    await register.submit();
    await expect(page).toHaveURL(/auth\/login/);

    await new LoginPage(page).login(user.email, user.password);
    await expect(page).toHaveURL(/account/);

    await use(page);
  },
});

export { expect } from '@playwright/test';