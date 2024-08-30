import { Cart } from "@/app/types/Cart";
import { Products } from "@/app/types/Product";

export const fetchAllProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data : Products = await response.json();
    return data.products;
};

export const isValidStock = async (cart: Cart) => {
    const response = await fetch('http://localhost:4000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    });

    const result = await response.json();
    return result;
}
