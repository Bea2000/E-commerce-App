import { Container, Typography, Grid2 } from '@mui/material';
import React from 'react';
import { Product } from '@/app/types/Product';
import CartItem from '@/app/components/Cart/item';

interface CartMenuProps {
    cart: Product[];
}

export default function CartMenu({ cart }: CartMenuProps) {
  
  return (
    <Container className="bg-white my-8">
        <Typography variant="h5" gutterBottom className="font-work-sans font-bold text-center mb-4 text-slate-800">
          TU CARRO DE COMPRAS
        </Typography>
        <Grid2 
            container 
            className="self-center items-center justify-center m-2  bg-white"
            spacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            {cart.map((product) => (
                <Grid2 key={product.id} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <CartItem product={product} />
                </Grid2>
            ))}
        </Grid2>
    </Container>
  )
}
