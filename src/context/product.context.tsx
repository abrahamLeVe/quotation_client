"use client";
import { useMounted } from "@/hooks/useMounted";
import { ProductsInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useState } from "react";

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  isListening: boolean;
  getItemQuantity: (id: number) => number | undefined;
  getItemColorQuantity: (
    priceId: number,
    colorId: number
  ) => number | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  productsContext: ProductsInterface | undefined;
  setProductsContext: React.Dispatch<
    React.SetStateAction<ProductsInterface | undefined>
  >;
}

const ProductContext = createContext({} as ProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [productsContext, setProductsContext] = useState<ProductsInterface>();

  const cart = cartStore((state) => state);

  const mounted = useMounted();

  function getItemQuantity(id: number) {
    return mounted
      ? cart.cartItemState.find((item) => item.id === id)?.quantity
      : 0;
  }

  function getItemColorQuantity(priceId: number, colorId: number) {
    return mounted
      ? cart.cartItemState
          .find((item) => item.id === priceId)
          ?.colors?.find((color) => color.id === colorId)?.quantity
      : 0;
  }

  return (
    <ProductContext.Provider
      value={{
        isOpen,
        setIsOpen,
        getItemQuantity,
        getItemColorQuantity,
        productsContext,
        setProductsContext,
        isListening,
        setIsListening,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
