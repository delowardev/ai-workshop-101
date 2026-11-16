import { removeItem } from '@/lib/cart';
import { cartResponse, getCart } from '@/lib/store';

export async function DELETE(_request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return cartResponse(removeItem(getCart(), productId));
}
