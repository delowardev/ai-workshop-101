import { useState, type FormEvent } from 'react';
import { formatCents } from '@/lib/cart';
import type { CartState } from './Shop';

type Props = {
  cart: CartState;
  onRemove: (productId: string) => void;
  onApplyCode: (code: string) => void;
};

export function CartView({ cart, onRemove, onApplyCode }: Props) {
  const [code, setCode] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    onApplyCode(code);
  }

  return (
    <>
      {cart.items.length === 0 ? (
        <p data-testid="cart-empty">Your cart is empty.</p>
      ) : (
        <table data-testid="cart">
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item.productId} data-testid={`cart-item-${item.productId}`}>
                <td>{item.name}</td>
                <td data-testid="qty">{item.qty}</td>
                <td>{formatCents(item.priceCents * item.qty)}</td>
                <td>
                  <button type="button" data-testid={`remove-${item.productId}`} onClick={() => onRemove(item.productId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form className="discount" data-testid="discount-form" onSubmit={submit}>
        <label htmlFor="discount-code">Discount code</label>
        <input
          id="discount-code"
          data-testid="discount-input"
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" data-testid="discount-apply">Apply</button>
      </form>
    </>
  );
}
