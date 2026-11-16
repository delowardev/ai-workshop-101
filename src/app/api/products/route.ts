import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/cart';

export function GET() {
  return NextResponse.json(PRODUCTS);
}
