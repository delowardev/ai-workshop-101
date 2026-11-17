'use client';

import { useEffect, useState } from 'react';
import { formatCents, type Product } from '@/lib/cart';
import { cartApi, isStaticDemo, type CartState } from '@/lib/client-api';
import { CartView } from './CartView';
import { ProductList } from './ProductList';

export type { CartState };
type Message = { text: string; isError: boolean };

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartState | null>(null);
  const [message, setMessage] = useState<Message>({ text: '', isError: false });

  useEffect(() => {
    cartApi.getProducts().then(setProducts);
    cartApi.getCart().then(setCart);
  }, []);

  async function run(action: () => Promise<CartState>, success = '') {
    try {
      setCart(await action());
      setMessage({ text: success, isError: false });
    } catch (err) {
      setMessage({ text: (err as Error).message, isError: true });
    }
  }

  const addToCart = (productId: string) => run(() => cartApi.addItem(productId, 1));
  const removeFromCart = (productId: string) => run(() => cartApi.removeItem(productId));
  const applyCode = (code: string) => run(() => cartApi.applyCode(code), `Code ${code} applied`);

  return (
    <main>
      {isStaticDemo && (
        <p className="banner" data-testid="static-demo-banner">
          Static demo: the cart runs in your browser and resets when you reload.
        </p>
      )}
      <ProductList products={products} onAdd={addToCart} />
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading">Your cart</h2>
        {cart && <CartView cart={cart} onRemove={removeFromCart} onApplyCode={applyCode} />}
        <p role="status" data-testid="message" className={message.isError ? 'message error' : 'message'}>
          {message.text}
        </p>
        <dl className="totals">
          <dt>Subtotal</dt>
          <dd data-testid="subtotal">{formatCents(cart?.totals.subtotalCents ?? 0)}</dd>
          <dt>Discount</dt>
          <dd data-testid="discount">{formatCents(-(cart?.totals.discountCents ?? 0))}</dd>
          <dt>Shipping</dt>
          <dd data-testid="shipping">
            {cart && cart.totals.shippingCents === 0 && cart.totals.subtotalCents > 0
              ? 'Free'
              : formatCents(cart?.totals.shippingCents ?? 0)}
          </dd>
          <dt className="total">Total</dt>
          <dd className="total" data-testid="total">{formatCents(cart?.totals.totalCents ?? 0)}</dd>
        </dl>
      </section>
    </main>
  );
}
