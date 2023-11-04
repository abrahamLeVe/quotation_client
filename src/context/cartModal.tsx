"use client";
import CartOffCanvas from "@/components/cart/CartOffCanvas";
import { ProductNAInterface } from "@/models/newArrivals.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { ReactNode, createContext, useContext, useState } from "react";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  calculateTotal: () => { subTotal: number; igv: number; total: number };
  cartQuantity: number;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (id: number) => number;
  itemsOfCart: () => ProductNAInterface[];
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const products = productStorage((state) => state.productsOfCart);

  const cartQuantity = cart.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function itemsOfCart() {
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
        calculateTotal,
        cartQuantity,
        openCart,
        setOpenCart,
        getItemQuantity,
        itemsOfCart,
        openMenu,
        setOpenMenu,
      }}
    >
      {children}
      <CartOffCanvas />
    </CartContext.Provider>
  );
}
