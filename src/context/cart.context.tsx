"use client";
import { getDataProducts } from "@/app/services/product.service";
import CartOffCanvas from "@/components/cart/CartSliderOver";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useEffect, useState } from "react";

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
  calculateTotal: () => { igv: number; total: number };
  subTotal: number;
}

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const mounted = useMounted();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDataProducts();
        if (data) {
          setCartItems(
            data.filter((product) =>
              cart.some((cartItem) => cartItem.id === product.id)
            )
          );
          setSubTotal(
            cart.reduce((acc, cartItem) => {
              const product = data.find((item) => item.id === cartItem.id);
              return (
                acc +
                (product!.attributes.price - product!.attributes.discount ||
                  0) *
                  cartItem.quantity
              );
            }, 0)
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cart]);

  const cartQuantity = mounted
    ? cart.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function calculateIGV(subtotal: number) {
    const igvRate = 0;
    const igv = subtotal * igvRate;

    return igv;
  }

  function calculateTotal() {
    const igv = calculateIGV(subTotal);
    const total = subTotal + igv;
    return { igv, total };
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
        subTotal,
      }}
    >
      {children}
      <CartOffCanvas />
    </CartContext.Provider>
  );
}
