/* eslint-disable no-console */

"use client";

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { fetchAllProducts } from '@/app/api';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Product } from '@/app/types/Product';
import getRandomCart from '@/app/middlewares/Cart';

const pages = ['Generar Carrito', 'Finalizar Compra'];

interface ResponsiveAppBarProps {
  // eslint-disable-next-line no-unused-vars
  onCartGenerated: (products: Product[]) => void;
  isCartGenerated: boolean;
  paramCartId: string | null;
}
function ResponsiveAppBar({ onCartGenerated, isCartGenerated, paramCartId }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [cartId, setCartId] = React.useState<string>('');
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleGenerateCart = async () => {
    try {
      const products = await fetchAllProducts();
      const randomCart = getRandomCart(products);
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(randomCart),
      });
      const data = await response.json();
      setCartId(data.cartId);
      onCartGenerated(randomCart);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClicked = async (page: string) => {
    if (page === 'Generar Carrito') {
      await handleGenerateCart();
    } else if (page === 'Finalizar Compra') {
      if (cartId === '') {
        router.push(`/checkout/${paramCartId}`);
      } else {
        router.push(`/checkout/${cartId}`);
      }
    }
  };

  return (
    <AppBar position="static" className="bg-white w-full" sx={{ width: '100%' }}>
      <Container>
        <Toolbar disableGutters>
          <Image src="/nomad.png" alt="Nomad Logo" width={100} height={200} />
          {/* for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "flex-end" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#4b4447' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page}
                  onClick={() => handlePageClicked(page)}
                  sx={{display: (page === 'Finalizar Compra' && !isCartGenerated) ? 'none' : 'block'}}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClicked(page)}
                sx={{ 
                  my: 2,
                  color: '#4b4447',
                  '&:hover': {
                    color: '#e05d1e',
                  },
                  mx: 2,
                  display: (page === 'Finalizar Compra' && !isCartGenerated) ? 'none' : 'block'
                }}
                className='font-semibold font-work-sans'
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}export default ResponsiveAppBar;
