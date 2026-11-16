import { NextResponse } from 'next/server';
import { CartError, calculateTotals, createCart, type Cart } from './cart';

// One shared in-memory cart keeps the demo simple. Not for production.
// Kept on globalThis so it survives hot reloads in `next dev`.
const globalStore = globalThis as unknown as { __quickcart?: Cart };

export function getCart(): Cart {
  globalStore.__quickcart ??= createCart();
  return globalStore.__quickcart;
}

export function resetCart(): Cart {
  globalStore.__quickcart = createCart();
  return globalStore.__quickcart;
}

export function cartResponse(cart: Cart, status = 200) {
  return NextResponse.json({ ...cart, totals: calculateTotals(cart) }, { status });
}

// Runs a route handler and turns CartErrors into 400 responses.
export async function handle(fn: () => Response | Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof CartError) return NextResponse.json({ error: err.message }, { status: 400 });
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    return (await request.json()) ?? {};
  } catch {
    return {};
  }
}
