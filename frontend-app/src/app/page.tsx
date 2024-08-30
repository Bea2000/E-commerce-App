
"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResponsiveAppBar from "@/app/components/Navbar";
import WelcomePage from "@/app/components/Welcome";
import CartMenu from "@/app/components/Cart";
import { Product } from "@/app/types/Product";
import AlertBox from "@/app/components/Alert";
import { Container } from "@mui/material";

export default function Home() {
  const [cart, setCart] = React.useState<Product[]>([]);
  const [isCartGenerated, setIsCartGenerated] = React.useState<boolean>(false);
  const [paramCartId, setCartId] = React.useState<string | null>(null);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const cartMenuRef = useRef<HTMLDivElement>(null);

  const fetchCartData = async (cartId: string) => {
    const response = await fetch(`/api/cart?id=${cartId}`);
    const cartData = await response.json();
    return cartData;
  };

  const handleCartGenerated = (cartData: Product[]) => {
    setCart(cartData);
    setIsCartGenerated(true);
    setOpenAlert(true);
  };

  useEffect(() => {
    const cartId = searchParams.get('cartId');
    if (cartId) {
      setCartId(cartId);
      fetchCartData(cartId).then(cartData => {
        handleCartGenerated(cartData);
        setOpenAlert(false);
      });
    }
  }, [searchParams]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (cart.length > 0 && isCartGenerated && cartMenuRef.current) {
      const offsetPosition = cartMenuRef.current.offsetTop - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [cart, isCartGenerated]);

  return (
    <Container className="bg-white m-0 p-0 w-screen">
      <Container sx={{ width: '100%' }} className="fixed z-[1000] m-0 p-0 w-screen" >
        <AlertBox
          message="Se ha generado el carrito de compras exitósamente 🤓!"
          severity="success"
          open={openAlert}
          onClose={handleCloseAlert}
        />
        <ResponsiveAppBar onCartGenerated={handleCartGenerated} isCartGenerated={isCartGenerated} paramCartId={paramCartId} />
      </Container >
      <Container className="w-screen m-0 p-0" sx={{ width: '100%' }}>
        <WelcomePage />
      </Container>
      <div ref={cartMenuRef} />
      {cart.length > 0 && <CartMenu cart={cart}/>}
    </Container>
  );
}
