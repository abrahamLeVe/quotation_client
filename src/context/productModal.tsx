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
  cleanModal: () => void;
  getProduct: (id: number) => void;
  getItemQuantity: (id: number) => number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext({} as ProductContext);

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const products = productStorage((state) => state.productState);
  const [product, setProdut] = useState<ProductNAInterface>();
  const [isOpen, setIsOpen] = useState(false);
  const cart = cartStore((state) => state);

  const cleanModal = () => {
    setProdut(undefined);
  };

  function getProduct(id: number) {
    const item = products.data.find(
      (item: ProductNAInterface) => item.id === id
    );
    setIsOpen(true);
    return setProdut(item);
  }

  function getItemQuantity(id: number) {
    return cart.cartItemState.find((item) => item.id === id)?.quantity || 0;
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        isOpen,
        cleanModal,
        getProduct,
        setIsOpen,
        getItemQuantity,
      }}
    >
      {children}
      {product && <ProductModal />}
    </ProductContext.Provider>
  );
}
