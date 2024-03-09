"use client";
import { getDataProducts } from "@/app/services/product.service";
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
  setCartItems: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (id: number) => number;
  // calculateTotal: () => { igv: number; total: number };
  // subTotal: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);
  // const [subTotal, setSubTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mounted = useMounted();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getDataProducts();
        if (data?.data) {
          setCartItems(
            data.data.flatMap((product) =>
              cart
                .filter((cartItem) =>
                  product.attributes.prices.data.some(
                    (price) => price.id === cartItem.id
                  )
                )
                .map(() => product)
            )
          );

          // setSubTotal(
          //   cart.reduce((acc, cartItem) => {
          //     const product = data.data.find((item) =>
          //       item.attributes.prices.data.some(
          //         (price) => price.id === cartItem.id
          //       )
          //     );

          //     const selectedPrice = product!.attributes.prices.data.find(
          //       (price) => price.id === cartItem.id
          //     );

          //     return (
          //       acc +
          //       (selectedPrice!.attributes.value -
          //         selectedPrice!.attributes.discount! || 0) *
          //         cartItem.quantity
          //     );
          //   }, 0)
          // );
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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

  // function calculateTotal() {
  //   const igv = calculateIGV(subTotal);
  //   const total = subTotal + igv;
  //   return { igv, total };
  // }

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        openMenu,
        // calculateTotal,
        getItemQuantity,
        setOpenMenu,
        cartItems,
        setCartItems,
        // subTotal,
        setIsLoading,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
