"use client";
import { getDataProducts } from "@/app/services/product.service";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { Items } from "@/models/quotation.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useEffect, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}
// export interface CartItem {
//   id: number;
//   quantity: number;
// }

interface CartContext {
  cartQuantity: number;
  cartItems: ProductInterface[];
  openMenu: boolean;
  setCartItems: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (id: number) => number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  productsInCar: () => Items[];
}

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const [openMenu, setOpenMenu] = useState(false);
  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);
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

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  function productsInCar() {
    const products: Items[] = cart.map((cartItem) => {
      const product = cartItems.find((p) =>
        p.attributes.prices.data.some((price) => price.id === cartItem.id)
      );

      const selectedPrice = product?.attributes?.prices.data.find(
        (price) => price.id === cartItem.id
      );

      return {
        id: cartItem.id.toFixed(),
        title: product?.attributes.name,
        quantity: cartItem.quantity,
        picture_url: product?.attributes.thumbnail.data.attributes.url,
        size: selectedPrice?.attributes.size.data?.attributes.name,
        colors: cartItem.colors,
      };
    });
    return products;
  }

  const cartQuantity = mounted
    ? cart.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;
  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        openMenu,
        getItemQuantity,
        setOpenMenu,
        cartItems,
        setCartItems,
        setIsLoading,
        isLoading,
        productsInCar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
