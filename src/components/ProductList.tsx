import { formatCents, type Product } from '@/lib/cart';

type Props = { products: Product[]; onAdd: (productId: string) => void };

export function ProductList({ products, onAdd }: Props) {
  return (
    <section aria-labelledby="products-heading">
      <h2 id="products-heading">Products</h2>
      <ul className="products" data-testid="products">
        {products.map((p) => (
          <li key={p.id}>
            <span>{p.name}</span>
            <span>{formatCents(p.priceCents)}</span>
            <button type="button" data-testid={`add-${p.id}`} onClick={() => onAdd(p.id)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
