import { describe, it, expect } from 'vitest';
import {
  createCart,
  addItem,
  removeItem,
  applyDiscount,
  calculateTotals,
  formatCents,
  SHIPPING_CENTS,
} from '../src/cart.js';

describe('addItem', () => {
  it('adds a product to the cart', () => {
    const cart = addItem(createCart(), 'mug');
    expect(cart.items).toEqual([{ productId: 'mug', name: 'Coffee mug', priceCents: 1250, qty: 1 }]);
  });

  it('increases the quantity when the product is already in the cart', () => {
    const cart = createCart();
    addItem(cart, 'mug');
    addItem(cart, 'mug', 2);
    expect(cart.items[0].qty).toBe(3);
  });

  it('rejects unknown products', () => {
    expect(() => addItem(createCart(), 'spaceship')).toThrow('Unknown product');
  });

  it('rejects fractional quantities', () => {
    expect(() => addItem(createCart(), 'mug', 1.5)).toThrow('whole number');
  });
});

describe('removeItem', () => {
  it('removes the product from the cart', () => {
    const cart = addItem(createCart(), 'mug');
    removeItem(cart, 'mug');
    expect(cart.items).toEqual([]);
  });
});

describe('calculateTotals', () => {
  it('charges shipping on small orders', () => {
    const cart = addItem(createCart(), 'mug');
    expect(calculateTotals(cart)).toEqual({
      subtotalCents: 1250,
      discountCents: 0,
      shippingCents: SHIPPING_CENTS,
      totalCents: 1250 + SHIPPING_CENTS,
    });
  });

  it('gives free shipping on large orders', () => {
    const cart = addItem(createCart(), 'tee', 3);
    expect(calculateTotals(cart).shippingCents).toBe(0);
  });

  it('charges nothing for an empty cart', () => {
    expect(calculateTotals(createCart()).totalCents).toBe(0);
  });
});

describe('applyDiscount', () => {
  it('SAVE10 takes 10% off the subtotal', () => {
    const cart = addItem(createCart(), 'cap');
    applyDiscount(cart, 'SAVE10');
    expect(calculateTotals(cart).discountCents).toBe(200); // 10% of 1999, rounded
  });

  it('FIVEOFF takes $5.00 off orders of $25.00 or more', () => {
    const cart = addItem(createCart(), 'tee');
    applyDiscount(cart, 'FIVEOFF');
    expect(calculateTotals(cart).discountCents).toBe(500);
  });

  it('FIVEOFF is refused below $25.00', () => {
    const cart = addItem(createCart(), 'mug');
    expect(() => applyDiscount(cart, 'FIVEOFF')).toThrow('FIVEOFF needs a subtotal of $25.00');
  });

  it('rejects unknown codes', () => {
    const cart = addItem(createCart(), 'mug');
    expect(() => applyDiscount(cart, 'FREESTUFF')).toThrow('Invalid discount code');
  });

  it('rejects codes on an empty cart', () => {
    expect(() => applyDiscount(createCart(), 'SAVE10')).toThrow('Add items before applying a code');
  });
});

describe('formatCents', () => {
  it('formats cents as dollars', () => {
    expect(formatCents(1849)).toBe('$18.49');
    expect(formatCents(-500)).toBe('-$5.00');
  });
});
