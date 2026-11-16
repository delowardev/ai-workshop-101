Title: Orders of exactly $50.00 are still charged shipping
Labels: bug

**What happens**
Add 2 T-shirts ($25.00 each). The subtotal is $50.00 but shipping shows $5.99 and the total is $55.99.

**What should happen**
The site says "Free shipping on orders of $50.00 or more", so shipping should be Free and the total $50.00.
See `docs/acceptance-criteria/shipping.md`, criterion 1.

**Steps to reproduce**
1. `npm run dev` and open http://localhost:3000
2. Click "Add to cart" on T-shirt twice
3. Look at the Shipping line
