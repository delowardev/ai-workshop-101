'use client';

import { useEffect, useState } from 'react';
import { formatCents, type Cart, type Product, type Totals } from '@/lib/cart';
import { CartView } from './CartView';
import { ProductList } from './ProductList';

export type CartState = Cart & { totals: Totals };
type Message = { text: string; isError: boolean };

async function api<T>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data as T;
}

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartState | null>(null);
  const [message, setMessage] = useState<Message>({ text: '', isError: false });

  useEffect(() => {
    api<Product[]>('GET', '/api/products').then(setProducts);
    api<CartState>('GET', '/api/cart').then(setCart);
  }, []);

  async function run(action: () => Promise<CartState>, success = '') {
    try {
      setCart(await action());
      setMessage({ text: success, isError: false });
    } catch (err) {
      setMessage({ text: (err as Error).message, isError: true });
    }
  }

  const addToCart = (productId: string) =>
    run(() => api('POST', '/api/cart/items', { productId, qty: 1 }));

  const removeFromCart = (productId: string) =>
    run(() => api('DELETE', `/api/cart/items/${productId}`));

  const applyCode = (code: string) =>
    run(() => api('POST', '/api/cart/discount', { code }), `Code ${code} applied`);

  return (
    <main>
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
