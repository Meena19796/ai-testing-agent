import { Page, expect } from '@playwright/test'

export class RegisterPage {
    constructor(private page: Page) { }

    async open() {
        await this.page.goto('/auth/register')
    }

    async fillForm(u: ReturnType<typeof import('../utils/testData').newUser>) {
        await this.page.getByTestId('first-name').fill(u.firstName);
        await this.page.getByTestId('last-name').fill(u.lastName);
        await this.page.getByTestId('dob').fill(u.dob);
        await this.page.getByTestId('street').fill(u.street);
        await this.page.getByTestId('city').fill(u.city);
        await this.page.getByTestId('state').fill(u.state);
        await this.page.getByLabel('Country').selectOption({ label: 'United States of America (the)' });
        await this.page.getByTestId('postal_code').fill(u.postcode);
        await this.page.getByPlaceholder('e.g. 42 *').fill(u.houseNumber);
        await this.page.getByTestId('phone').fill(u.phone);
        await this.page.getByTestId('email').fill(u.email);
        await this.page.getByTestId('password').fill(u.password);
    }

    async submit() {
        await this.page.getByTestId('register-submit').click();
    }
}