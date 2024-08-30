import * as React from 'react';
import { useEffect } from 'react';
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, TextField, Container } from '@mui/material';
import { Product } from '@/app/types/Product';
import { CartItem } from '@/app/types/Cart';

// eslint-disable-next-line no-unused-vars
export default function CheckoutList({ cart, onCartUpdate }:{ cart: Product[], onCartUpdate: (cartItems: CartItem[]) => void }) {
    const [cartwithQuantity, setCartWithQuantity] = React.useState<CartItem[]>([]);

    useEffect(() => {
        const newCart = cart.map((product) => ({
            productId: product.id.toString(),
            price: product.price,
            quantity: 1,
            discount: product.discountPercentage,
        }));
        setCartWithQuantity(newCart);
        onCartUpdate(newCart);
    }, [cart]);

    const changeQuantity = (productId: number, quantity: number, stock: number) => {
        let returnedQuantity = quantity;
        const newCart = cartwithQuantity.map((product) => {
            if (product.productId === productId.toString()) {
                if (quantity > stock){
                    returnedQuantity = stock;
                }
                return {
                    ...product,
                    quantity: returnedQuantity,
                };
            }
            return product;
        });
        setCartWithQuantity(newCart);
        onCartUpdate(newCart);
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Container className="flex flex-row w-full justify-between items-center">
                <Typography variant="h6" gutterBottom className="ml-8 font-work-sans font-medium mb-4 text-base text-slate-800">
                    Producto
                </Typography>
                <Typography variant="h6" gutterBottom className="font-work-sans font-medium mb-4 text-base text-slate-800 mr-8">
                    Cantidad
                </Typography>
                <Typography variant="h6" gutterBottom className="font-work-sans font-medium mb-4 text-base text-slate-800 mr-32">
                    Total
                </Typography>
            </Container>
            <Divider orientation="horizontal" flexItem className='mb-8' />
            {cart.map((product) => (
                <ListItem alignItems="flex-start" key={product.id}>
                    <Container className="flex flex-row w-full justify-between items-center">
                        <ListItemAvatar>
                        <Avatar alt={product.title} src={product.images[0]} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.title}
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    ${product.price}
                                </Typography>
                            }
                        />
                    </Container>
                    <Container className="flex flex-row w-full justify-between items-center">
                        <TextField
                            id={product.id.toString()}
                            type="number"
                            className="w-2/4 mr-2 focus:outline-none"
                            value={cartwithQuantity.find((item) => item.productId === product.id.toString())?.quantity}
                            onChange={(e) => {
                                changeQuantity(product.id, Number(e.target.value), product.stock);
                            }}
                        />
                    </Container>
                    <Container className="flex flex-row w-full justify-between items-center">
                        <Typography variant="subtitle2" gutterBottom className="font-work-sans font-medium mb-4 text-base text-slate-800 mr-16">
                            ${product.price * (cartwithQuantity.find((item) => item.productId === product.id.toString())?.quantity ?? 1)}
                        </Typography>
                    </Container>
                </ListItem>
            ))}
        <Divider variant="inset" component="li" />
        </List>
  );
}
