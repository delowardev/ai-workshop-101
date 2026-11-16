import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, request }) => {
  await request.post('/api/cart/reset');
  await page.goto('/');
});

test('shows the product list', async ({ page }) => {
  await expect(page.getByTestId('products').getByRole('listitem')).toHaveCount(4);
});

test('adding a mug updates the cart and totals', async ({ page }) => {
  await page.getByTestId('add-mug').click();

  await expect(page.getByTestId('cart-item-mug')).toBeVisible();
  await expect(page.getByTestId('subtotal')).toHaveText('$12.50');
  await expect(page.getByTestId('shipping')).toHaveText('$5.99');
  await expect(page.getByTestId('total')).toHaveText('$18.49');
});

test('removing the last item empties the cart', async ({ page }) => {
  await page.getByTestId('add-mug').click();
  await page.getByTestId('remove-mug').click();

  await expect(page.getByTestId('cart-empty')).toBeVisible();
  await expect(page.getByTestId('total')).toHaveText('$0.00');
});
