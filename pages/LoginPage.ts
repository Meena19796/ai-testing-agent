import { Page, expect } from '@playwright/test'

export class LoginPage {
    constructor(private page: Page) { }
    async open() {
        await this.page.goto('/auth/login');
    }


    async login(email: string, password: string) {
        await this.page.getByTestId('email').fill(email);
        await this.page.getByTestId('password').fill(password);
        await this.page.getByTestId('login-submit').click();

    }

     async expectLoginError() {
        await expect(this.page.getByTestId('login-error')).toBeVisible();
    }

    async submit() {
        await this.page.getByTestId('login-submit').click();
    }
   

    async expectFieldErrors() {
        await expect(this.page.getByTestId('email-error')).toBeVisible();
        await expect(this.page.getByTestId('password-error')).toBeVisible();
    }

      async expectEmailError() {
    await expect(this.page.getByTestId('email-error')).toBeVisible();
  }
}