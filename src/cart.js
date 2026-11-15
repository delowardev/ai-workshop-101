// Cart logic for QuickCart.
// All money values are integer cents (1250 = $12.50). Never use floats for money.

export const SHIPPING_CENTS = 599;
export const FREE_SHIPPING_THRESHOLD_CENTS = 5000;

export const PRODUCTS = [
  { id: 'mug', name: 'Coffee mug', priceCents: 1250 },
  { id: 'tee', name: 'T-shirt', priceCents: 2500 },
  { id: 'cap', name: 'Baseball cap', priceCents: 1999 },
  { id: 'stickers', name: 'Sticker pack', priceCents: 500 },
];

const DISCOUNT_CODES = {
  SAVE10: { type: 'percent', percent: 10 },
  FIVEOFF: { type: 'fixed', amountCents: 500, minSubtotalCents: 2500 },
};

export class CartError extends Error {}

export function createCart() {
  return { items: [], discountCode: null };
}

export function findProduct(productId) {
  return PRODUCTS.find((p) => p.id === productId);
}

export function addItem(cart, productId, qty = 1) {
  const product = findProduct(productId);
  if (!product) throw new CartError('Unknown product');
  if (!Number.isInteger(qty)) throw new CartError('Quantity must be a whole number');

  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.items.push({ productId, name: product.name, priceCents: product.priceCents, qty });
  }
  return cart;
}

export function removeItem(cart, productId) {
  cart.items = cart.items.filter((i) => i.productId !== productId);
  return cart;
}

export function subtotalCents(cart) {
  return cart.items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
}

export function applyDiscount(cart, code) {
  if (cart.items.length === 0) throw new CartError('Add items before applying a code');

  const discount = DISCOUNT_CODES[code];
  if (!discount) throw new CartError('Invalid discount code');

  if (discount.minSubtotalCents && subtotalCents(cart) < discount.minSubtotalCents) {
    throw new CartError(`${code} needs a subtotal of ${formatCents(discount.minSubtotalCents)}`);
  }
  cart.discountCode = code;
  return cart;
}

export function clearDiscount(cart) {
  cart.discountCode = null;
  return cart;
}

function discountCents(cart, subtotal) {
  const discount = DISCOUNT_CODES[cart.discountCode];
  if (!discount) return 0;
  if (discount.type === 'percent') return Math.round((subtotal * discount.percent) / 100);
  if (subtotal < discount.minSubtotalCents) return 0;
  return Math.min(discount.amountCents, subtotal);
}

function shippingCents(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal > FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_CENTS;
}

export function calculateTotals(cart) {
  const subtotal = subtotalCents(cart);
  const discount = discountCents(cart, subtotal);
  const shipping = shippingCents(subtotal);
  return {
    subtotalCents: subtotal,
    discountCents: discount,
    shippingCents: shipping,
    totalCents: subtotal - discount + shipping,
  };
}

export function formatCents(cents) {
  const sign = cents < 0 ? '-' : '';
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}
