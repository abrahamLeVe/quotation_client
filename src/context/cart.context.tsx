import { useMounted } from "@/hooks/useMounted";
import { ProductsInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}
interface CartContext {
  cartQuantity: number;
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (id: number) => number;
  products: ProductsInterface | undefined;
  setProducts: React.Dispatch<
    React.SetStateAction<ProductsInterface | undefined>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getItemColorQuantity: (
    priceId: number,
    colorId: number
  ) => number | undefined;
}

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = cartStore((state) => state.cartItemState);
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState<ProductsInterface | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mounted = useMounted();

  function getItemQuantity(id: number) {
    return cart.find((item) => item.id === id)?.quantity || 0;
  }

  const cartQuantity = mounted
    ? cart.reduce((quantity, item) => item.quantity + quantity, 0)
    : 0;

  function getItemColorQuantity(priceId: number, colorId: number) {
    return mounted
      ? cart
          .find((item) => item.id === priceId)
          ?.colors?.find((color) => color.id === colorId)?.quantity
      : 0;
  }
  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        openMenu,
        getItemQuantity,
        setOpenMenu,
        setIsLoading,
        isLoading,
        products,
        setProducts,
        getItemColorQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
