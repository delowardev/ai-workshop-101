Title: API accepts zero and negative quantities
Labels: bug

**What happens**
`POST /api/cart/items` with `{"productId": "mug", "qty": -3}` returns 201, and the cart total becomes negative (-$31.51).
`qty: 0` adds an empty line to the cart.

**What should happen**
Quantities below 1 are rejected with HTTP 400 and the message "Quantity must be at least 1". The cart does not change.

**Steps to reproduce**
```bash
curl -X POST localhost:3000/api/cart/items -H 'Content-Type: application/json' -d '{"productId":"mug","qty":-3}'
```
