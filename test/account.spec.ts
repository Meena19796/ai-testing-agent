import { test, expect } from '../fixtures/auth';

test('new user lands on account page', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/account/);
});