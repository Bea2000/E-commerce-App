import { Request, Response, NextFunction } from 'express';
import { Cart, CartItem } from '../types/Cart';

function isValidCartItem(item: any): item is CartItem {
  return (
    typeof item === 'object' &&
    typeof item.productId === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    typeof item.discount === 'number'
  );
}

export function validateCart(cart: Cart): boolean {

    if (!Array.isArray(cart)) {
        return false;
    }

    for (const item of cart) {
        if (!isValidCartItem(item)) {
            return false;
        }
    }

    return true;
}
