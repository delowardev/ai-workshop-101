import { addItem } from '@/lib/cart';
import { cartResponse, getCart, handle, readJson } from '@/lib/store';

export async function POST(request: Request) {
  return handle(async () => {
    const { productId, qty = 1 } = await readJson(request);
    addItem(getCart(), String(productId), qty as number);
    return cartResponse(getCart(), 201);
  });
}
