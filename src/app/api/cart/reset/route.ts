import { cartResponse, resetCart } from '@/lib/store';

// Used by end-to-end tests to start from an empty cart.
export function POST() {
  return cartResponse(resetCart());
}
