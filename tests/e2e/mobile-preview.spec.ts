import { expect, test } from '@playwright/test';

test('mobile homepage renders without layout crash', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('DISCOVER PLACES SRI LANKA')).toBeVisible();
  await expect(page.locator('body')).toBeVisible();
});
