"use client";
import CartOffCanvas from "@/components/cart/CartSliderOver";
import MenuMobile from "@/components/navbar/MenuMobile";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { createContext, useContext, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContext {
  cartQuantity: number;
  openMenu: boolean;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  itemsOfCart: () => ProductInterface[];
  getItemQuantity: (id: number) => number;
  calculateTotal: () => { subTotal: number; igv: number; total: number };
}

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const mounted = useMounted();

  const products = productStorage((state) => state.productsOfCart);

  const cartQuantity = mounted
    ? cart.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function itemsOfCart() {
    const items = products(cart);
    return items;
  }

  function removeItemsOfCart() {
    const items = products(cart);
    return items;
  }

  function calculateTotal() {
    const subTotal = productStorage((state) => state.calculateSubtotal)(cart);
    const igv = productStorage((state) => state.calculateIGV)(subTotal);
    const total = productStorage((state) => state.calculateTotal)(
      subTotal,
      igv
    );
    return { subTotal, igv, total };
  }

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        openCart,
        openMenu,
        calculateTotal,
        setOpenCart,
        getItemQuantity,
        itemsOfCart,
        setOpenMenu,
      }}
    >
      {children}
      <CartOffCanvas />
    </CartContext.Provider>
  );
}
