import { test, expect } from '@playwright/test';

// Site-wide checks that apply to every page.
const pages = ['/', '/blog'];

for (const path of pages) {
  test(`${path} tells search engines not to index it`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  test(`${path} shows the Logoipsum placeholder logo in header and footer`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('banner').getByRole('img', { name: 'Logoipsum' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('img', { name: 'Logoipsum' })).toBeVisible();
  });
}
