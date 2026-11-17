// How the UI talks to the cart.
// Normally it calls the Next.js API routes. The GitHub Pages build is static (no server),
// so with NEXT_PUBLIC_STATIC_DEMO=true the same cart logic runs in the browser instead.
import {
  PRODUCTS,
  addItem,
  applyDiscount,
  calculateTotals,
  createCart,
  removeItem,
  type Cart,
  type Product,
  type Totals,
} from './cart';

export type CartState = Cart & { totals: Totals };

export type CartApi = {
  getProducts(): Promise<Product[]>;
  getCart(): Promise<CartState>;
  addItem(productId: string, qty: number): Promise<CartState>;
  removeItem(productId: string): Promise<CartState>;
  applyCode(code: string): Promise<CartState>;
};

export const isStaticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === 'true';

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data as T;
}

const httpApi: CartApi = {
  getProducts: () => request('GET', '/api/products'),
  getCart: () => request('GET', '/api/cart'),
  addItem: (productId, qty) => request('POST', '/api/cart/items', { productId, qty }),
  removeItem: (productId) => request('DELETE', `/api/cart/items/${productId}`),
  applyCode: (code) => request('POST', '/api/cart/discount', { code }),
};

function browserApi(): CartApi {
  const cart = createCart();
  // Return a copy so React sees a new object after every change.
  const snapshot = async (): Promise<CartState> => ({ ...structuredClone(cart), totals: calculateTotals(cart) });
  return {
    getProducts: async () => PRODUCTS,
    getCart: snapshot,
    addItem: async (productId, qty) => (addItem(cart, productId, qty), snapshot()),
    removeItem: async (productId) => (removeItem(cart, productId), snapshot()),
    applyCode: async (code) => (applyDiscount(cart, code), snapshot()),
  };
}

export const cartApi: CartApi = isStaticDemo ? browserApi() : httpApi;
