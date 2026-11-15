Title: Show how much more is needed for free shipping
Labels: enhancement

**What we want**
When the cart has items and the subtotal is under $50.00, show a message under the totals:
"Add $X.XX more for free shipping". When the subtotal reaches $50.00, show "You get free shipping!".
With an empty cart, show nothing.

**Acceptance criteria**
1. Subtotal $12.50: "Add $37.50 more for free shipping"
2. Subtotal $50.00 or more: "You get free shipping!"
3. Empty cart: no message
4. The message updates immediately when items are added or removed
5. The element has `data-testid="shipping-hint"` and is covered by a Playwright test
