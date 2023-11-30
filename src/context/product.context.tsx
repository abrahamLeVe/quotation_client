"use client";
import ProductModal from "@/components/product/ProductModal";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useState } from "react";

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  product: ProductInterface[];
  getItemQuantity: (id: number) => number | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  cleanProductModal: () => void;
}

const ProductContext = createContext({} as ProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [product, setProduct] = useState<ProductInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const cart = cartStore((state) => state);

  const mounted = useMounted();

  function getItemQuantity(id: number) {
    return mounted
      ? cart.cartItemState.find((item) => item.id === id)?.quantity
      : 0;
  }

  function cleanProductModal() {
    setProduct([]);
    setIsOpen(false);
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        isOpen,
        setIsOpen,
        getItemQuantity,
        setProduct,
        cleanProductModal,
      }}
    >
      {children}
      {product[0] ? <ProductModal /> : null}
    </ProductContext.Provider>
  );
}
