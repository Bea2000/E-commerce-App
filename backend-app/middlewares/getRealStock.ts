export function getRealStock(stock: number, rating: number) : number {
    return Math.floor(stock / rating);
}