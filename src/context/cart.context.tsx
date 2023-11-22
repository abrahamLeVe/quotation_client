"use client";
import CartOffCanvas from "@/components/cart/CartSliderOver";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./product.context";

interface CartProviderProps {
  children: React.ReactNode;
}
export interface CartItem {
  id: number;
  quantity: number;
}
interface CartContext {
  cartQuantity: number;
  cartItems: ProductInterface[];
  openMenu: boolean;
  openCart: boolean;
  setCartItems: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (id: number) => number;
  calculateTotal: () => { subTotal: number; igv: number; total: number };
}

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const { products } = useProductContext();
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);
  const mounted = useMounted();

  useEffect(() => {
    (() => {
      setCartItems(
        products.filter((product) =>
          cart.some((cartItem) => cartItem.id === product.id)
        )
      );
    })();
  }, [products, cart]);

  const cartQuantity = mounted
    ? cart.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id === id)?.quantity || 0;
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
        setOpenMenu,
        cartItems,
        setCartItems,
      }}
    >
      {children}
      <CartOffCanvas />
    </CartContext.Provider>
  );
}
