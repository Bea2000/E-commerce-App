import express, { Request, Response } from 'express';
import { Cart, ReturnedCart } from './types/Cart';
import { Products, Product } from './types/Product';
import { validateCart } from './middlewares/validateCart';
import { getRealStock } from './middlewares/getRealStock';

const app = express();
const cors = require('cors');
const port = 4000;
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/api/cart', async (req: Request, res: Response) => {
  const cart: Cart = req.body;
  if (!validateCart(cart)){
    res.status(400).send('Invalid cart');
    return;
  };

  let products : Product[] = [];
  let total = 1;
  let skip = 0;
  while (skip < total) {
    const response = await fetch(`https://dummyjson.com/products/?limit=10&skip=${skip}`);
    const data : Products = await response.json();
    if (!data.products) {
      continue;
    }
    products = products.concat(data.products);
    total = data.total;
    skip += 10;
  }

  const returnedCart : ReturnedCart = [];
  let isValidStock = true;

  for (const item of cart) {
    const product = products.find(p => p.id === parseInt(item.productId));
    const realStock = getRealStock(product?.stock || 0, product?.rating || 0);

    if (product) {
      returnedCart.push({
        productId: item.productId,
        name: product.title,
        price: product.price,
        discount: item.discount,
        quantity: item.quantity,
        stock: product.stock,
        rating: product.rating,
        realStock,
      });
    }

    if (realStock < item.quantity) {
      isValidStock = false;
    }
    
    if (!product) {
      res.status(400).send(`Product not found: ${item.productId}`);
      return;
    }
  }

  res.send(isValidStock);
});

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`);
});
