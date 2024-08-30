export interface CartItem {
    productId: string;
    price: number;
    quantity: number;
    discount: number;
}

export interface ReturnedItem {
    productId: string;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    stock: number;
    rating: number;
    realStock: number;
}

export type ReturnedCart = ReturnedItem[];

export type Cart = CartItem[];