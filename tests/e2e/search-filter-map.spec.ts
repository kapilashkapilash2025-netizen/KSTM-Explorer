import { expect, test } from '@playwright/test';

test('places page search and filters work', async ({ page }) => {
  await page.goto('/places');
  await page.getByPlaceholder('Search by name or district...').fill('Kandy');
  await expect(page.getByText(/Showing \d+ places/)).toBeVisible();
  await page.getByRole('button', { name: /Map/i }).click();
  await expect(page.getByText('Map Locations')).toBeVisible();
});
