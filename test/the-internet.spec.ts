import { test, expect } from '@playwright/test';

const BASE = 'https://the-internet.herokuapp.com';

test('JS alert: accept it', async ({ page }) => {
  await page.goto(`${BASE}/javascript_alerts`);
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  await expect(page.locator('#result')).toContainText('successfully clicked an alert');
});

test('JS confirm: dismiss it', async ({ page }) => {
  await page.goto(`${BASE}/javascript_alerts`);
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  await expect(page.locator('#result')).toContainText('Cancel');
});

test('dropdown: select an option', async ({ page }) => {
  await page.goto(`${BASE}/dropdown`);
  await page.locator('#dropdown').selectOption('2');
  await expect(page.locator('#dropdown')).toHaveValue('2');
});

test('dynamic loading: wait without sleep', async ({ page }) => {
  await page.goto(`${BASE}/dynamic_loading/1`);
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('#finish')).toHaveText('Hello World!');
});

test('checkboxes: tick and untick', async ({ page }) => {
  await page.goto(`${BASE}/checkboxes`);
  const first = page.locator('input[type="checkbox"]').first();
  await first.check();
  await expect(first).toBeChecked();
  await first.uncheck();
  await expect(first).not.toBeChecked();
});
test('file upload', async ({ page }) => {
  await page.goto(`${BASE}/upload`);
  await page.locator('#file-upload').setInputFiles('sample.txt');
  await page.locator('#file-submit').click();
  await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
});