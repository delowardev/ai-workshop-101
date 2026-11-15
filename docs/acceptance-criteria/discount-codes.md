# Discount codes: acceptance criteria

1. **SAVE10** takes 10% off the subtotal, rounded to the nearest cent.
2. **FIVEOFF** takes $5.00 off when the subtotal is $25.00 or more. Below that, the message is
   "FIVEOFF needs a subtotal of $25.00" and the total does not change.
3. Codes are **not case-sensitive** and **ignore spaces before and after**: `save10`, `Save10` and ` SAVE10 ` all work.
4. An unknown code shows "Invalid discount code" and the total does not change.
5. Only one code applies at a time. Applying a new valid code replaces the previous one.
6. With an empty cart, applying any code shows "Add items before applying a code".
7. Free shipping is based on the subtotal **before** the discount.
