import { cartResponse, getCart } from '@/lib/store';

export const dynamic = 'force-dynamic';

export function GET() {
  return cartResponse(getCart());
}
