import { NextResponse } from 'next/server';

const carts = new Map();

export async function POST(request: Request) {
  const cartData = await request.json();
  const cartId = Date.now().toString();
  carts.set(cartId, cartData);
  return NextResponse.json({ cartId });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get('id');
  const cartData = carts.get(cartId);
  if (!cartData) {
    return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
  }
  return NextResponse.json(cartData);
}