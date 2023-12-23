"use client";
import { useMounted } from "@/hooks/useMounted";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useState } from "react";

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  getItemQuantity: (id: number) => number | undefined;
  getItemColorQuantity: (id: number, colorId: number) => number | undefined;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cleanProductModal: () => void;
}

const ProductContext = createContext({} as ProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const cart = cartStore((state) => state);

  const mounted = useMounted();

  function getItemQuantity(id: number) {
    return mounted
      ? cart.cartItemState.find((item) => item.id === id)?.quantity
      : 0;
  }

  function getItemColorQuantity(productId: number, colorId: number) {
    return mounted
      ? cart.cartItemState
          .find((item) => item.id === productId)
          ?.colors?.find((color) => color.id === colorId)?.quantity
      : 0;
  }

  function cleanProductModal() {
    setIsOpen(false);
  }

  return (
    <ProductContext.Provider
      value={{
        isOpen,
        setIsOpen,
        getItemQuantity,
        cleanProductModal,
        getItemColorQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
