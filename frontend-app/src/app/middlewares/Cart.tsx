import { Product } from "@/app/types/Product";

const getRandomCartLength = (totalQuantity : number) => Math.floor(Math.random() * (totalQuantity - 1)) + 1

const getRandomCart = (products: Product[]) => {
    const cartLength = getRandomCartLength(products.length);
    const cart: Product[] = [];
    const usedIndexes = new Set<number>();

    while (cart.length < cartLength) {
        const randomIndex = Math.floor(Math.random() * products.length);
        if (!usedIndexes.has(randomIndex)) {
            cart.push(products[randomIndex]);
            usedIndexes.add(randomIndex);
        }
    }

    return cart;
};

export default getRandomCart;
