export interface CartItem {
    productId: string;
    price: number;
    quantity: number;
    discount: number;
}

export type Cart = CartItem[];