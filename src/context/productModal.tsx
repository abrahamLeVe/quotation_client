"use client";
import ProductModal from "@/components/product/ProductModal";
import { ProductNAInterface } from "@/models/newArrivals.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { createContext, ReactNode, useContext, useState } from "react";

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  product: ProductNAInterface | undefined;
  getProduct: (id: number) => void;
  getItemQuantity: (id: number) => number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductNAInterface | undefined>
  >;
  cleanProductModal: () => void;
}

const ProductContext = createContext({} as ProductContext);

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const products = productStorage((state) => state.productState);
  const [product, setProduct] = useState<ProductNAInterface>();
  const [isOpen, setIsOpen] = useState(false);
  const cart = cartStore((state) => state);

  function getProduct(id: number) {
    const item = products.data.find(
      (item: ProductNAInterface) => item.id === id
    );
    setIsOpen(true);
    return setProduct(item);
  }

  function getItemQuantity(id: number) {
    return cart.cartItemState.find((item) => item.id === id)?.quantity || 0;
  }

  function cleanProductModal() {
    setProduct(undefined);
    setIsOpen(false);
    return;
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        isOpen,
        getProduct,
        setIsOpen,
        getItemQuantity,
        setProduct,
        cleanProductModal,
      }}
    >
      {children}
      {product && <ProductModal />}
    </ProductContext.Provider>
  );
}
