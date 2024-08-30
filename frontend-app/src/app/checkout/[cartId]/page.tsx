"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import Navbar from '@/app/components/Navbar/simple';
import CheckoutList from '@/app/components/Cart/checkoutList';
import AlertBox from '@/app/components/Alert';
import { Product } from '@/app/types/Product';
import { CartItem } from '@/app/types/Cart';
import { isValidStock } from '@/app/api';

export default function Checkout() {

  const params = useParams();
  const [cart, setCart] = useState<Product[]>([]);
  const [currentCart, setCurrentCart] = useState<CartItem[]>([]);
  const [isStockChecked, setIsStockChecked] = useState<boolean>(false);
  const [isCheckingStock, setIsCheckingStock] = useState<boolean>(false);
  const [buttonNeeded, setButtonNeeded] = useState<boolean>(true);
  const [severity, setSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('success');
  const [cartId, setCartId] = useState<string | string[]>('');

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(`/api/cart?id=${params.cartId}`);
      const cartData = await response.json();
      setCart(cartData);
      setCartId(params.cartId);
    };
    fetchCart();
  }, [params.cartId]);

  const handleCloseAlert = () => {
    setIsStockChecked(false);
  }

  const getOrderDeliveryCost = async () => {
    setIsCheckingStock(true);
    try {
      const valid = await isValidStock(currentCart);
      if (valid) {
        setSeverity('success');
      } else {
        setSeverity('error');
      }
      setIsStockChecked(true);
    } finally {
      setIsCheckingStock(false);
      setButtonNeeded(false);
    }
  }

  const handleCartUpdate = (cartItems: CartItem[]) => {
    setCurrentCart(cartItems);
  }

  return (
    <Container className="flex flex-row w-full m-0 p-0 h-full">
      <Container sx={{ width: '100%' }} className="fixed z-[1000] m-0 p-0 w-full" >
        <AlertBox
          message={severity === 'success' ? 'El stock es válido para esta compra!' : 'El stock no es suficiente para esta compra'}
          severity={severity}
          open={isStockChecked}
          onClose={handleCloseAlert}
        />
        <Navbar cartId={cartId} />
      </Container >
      <Container className="flex flex-col pt-24">
        <Typography variant="h5" gutterBottom className="font-work-sans font-bold mb-4 text-slate-800 text-left justify-self-left mx-0">
          Resumen de tu Orden
        </Typography>
        <CheckoutList cart={cart} onCartUpdate={handleCartUpdate} />
      </Container>
      <Container className="flex flex-col w-1/2 pt-24">
        {
        buttonNeeded && 
        <Button
          size='small'
          variant='contained'
          disabled={isCheckingStock}
          sx={{ 
            '&:hover': {
              color: 'white',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 87, 34, 0.5)',
            },
          }}
          className='font-semibold font-work-sans text-xs text-slate-200 py-4 rounded-full w-1/2 bg-nomad-orange'
          onClick={getOrderDeliveryCost}
        >
          {isCheckingStock ? 'Verificando...' : 'Cotizar Despacho'}
        </Button>}
        {!buttonNeeded && 
          <Container className="flex flex-col w-full">
            <Typography variant="h5" gutterBottom className="font-work-sans font-bold mb-4 text-slate-800 text-left justify-self-left mx-0">
              Cotización de Envío
            </Typography>
            {severity === 'success' && 
              <Typography variant="subtitle1" gutterBottom className="font-work-sans font-medium mb-4 text-slate-800 text-left justify-self-left mx-0">
                Envío Nomad ⚡️ - $3670
              </Typography>
            }
            {severity === 'error' &&
              <Typography variant="subtitle1" gutterBottom className="font-work-sans font-medium mb-4 text-slate-800 text-left justify-self-left mx-0">
                No hay envíos disponibles :(
              </Typography>
            }
          </Container>
        }
      </Container>

    </Container>
  );
}