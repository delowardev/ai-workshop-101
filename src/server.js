import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PRODUCTS,
  CartError,
  createCart,
  addItem,
  removeItem,
  applyDiscount,
  clearDiscount,
  calculateTotals,
} from './cart.js';

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

export function createApp() {
  const app = express();
  // One shared in-memory cart keeps the demo simple. Not for production.
  let cart = createCart();

  app.use(express.json());
  app.use(express.static(publicDir));

  const cartResponse = () => ({ ...cart, totals: calculateTotals(cart) });

  app.get('/api/products', (req, res) => res.json(PRODUCTS));

  app.get('/api/cart', (req, res) => res.json(cartResponse()));

  app.post('/api/cart/items', (req, res) => {
    const { productId, qty = 1 } = req.body ?? {};
    addItem(cart, productId, qty);
    res.status(201).json(cartResponse());
  });

  app.delete('/api/cart/items/:productId', (req, res) => {
    removeItem(cart, req.params.productId);
    res.json(cartResponse());
  });

  app.post('/api/cart/discount', (req, res) => {
    applyDiscount(cart, req.body?.code);
    res.json(cartResponse());
  });

  app.delete('/api/cart/discount', (req, res) => {
    clearDiscount(cart);
    res.json(cartResponse());
  });

  // Used by end-to-end tests to start from an empty cart.
  app.post('/api/cart/reset', (req, res) => {
    cart = createCart();
    res.json(cartResponse());
  });

  app.use((err, req, res, next) => {
    if (err instanceof CartError) return res.status(400).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });

  return app;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3000;
  createApp().listen(port, () => console.log(`QuickCart running on http://localhost:${port}`));
}
