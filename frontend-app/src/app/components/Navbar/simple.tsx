/* eslint-disable no-console */

"use client";

import { useRouter } from 'next/navigation';
import * as React from 'react';
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


function Navbar({ cartId } : { cartId: string | string[] }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goBack = () => {
    router.push(`/?cartId=${cartId}`);
  };

  const goBackCleaned = () => {
    router.push('/');
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
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <MenuItem 
                  onClick={goBack}
                >
                  <Typography sx={{ textAlign: 'center' }}>Volver</Typography>
                </MenuItem>
            </Menu>
          </Box>
          {/* for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' , justifyContent: 'flex-end'} }}>
              <Button
                onClick={goBack}
                sx={{ 
                  my: 2,
                  color: '#4b4447',
                  '&:hover': {
                    color: '#e05d1e',
                  },
                  mx: 2,
                }}
                className='font-semibold font-work-sans'
              >
                Volver
              </Button>
              <Button
                onClick={goBackCleaned}
                sx={{ 
                  my: 2,
                  color: '#4b4447',
                  '&:hover': {
                    color: '#e05d1e',
                  },
                  mx: 2,
                }}
                className='font-semibold font-work-sans'
              >
                Limpiar Carrito
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}export default Navbar;
