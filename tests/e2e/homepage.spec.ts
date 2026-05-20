import { expect, test } from '@playwright/test';

test('homepage loads and has key CTA buttons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('DISCOVER PLACES SRI LANKA')).toBeVisible();
  await expect(page.getByRole('link', { name: /TRIP PLANNER/i }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /DISCOVER PLACES/i })).toBeVisible();
});
