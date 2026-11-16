import { Shop } from '@/components/Shop';

export default function Home() {
  return (
    <>
      <header>
        <h1>QuickCart</h1>
        <p>Free shipping on orders of $50.00 or more.</p>
      </header>
      <Shop />
    </>
  );
}
