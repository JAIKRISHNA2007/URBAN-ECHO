import { expect, test } from '@playwright/test';

test('foundation shell loads', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'The common application shell is ready.',
    }),
  ).toBeVisible();
  await expect(page.getByText('Canonical contracts')).toBeVisible();
});
