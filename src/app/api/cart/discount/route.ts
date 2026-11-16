import { applyDiscount, clearDiscount } from '@/lib/cart';
import { cartResponse, getCart, handle, readJson } from '@/lib/store';

export async function POST(request: Request) {
  return handle(async () => {
    const { code } = await readJson(request);
    return cartResponse(applyDiscount(getCart(), String(code ?? '')));
  });
}

export function DELETE() {
  return cartResponse(clearDiscount(getCart()));
}
