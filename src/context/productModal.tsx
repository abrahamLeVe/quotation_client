"use client";
import ProductModal from "@/components/product/ProductModal";
import { ProductNAInterface } from "@/models/newArrivals.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { createContext, ReactNode, useContext, useState } from "react";

type ProductProviderProps = {
  children: ReactNode;
};

type ProductContext = {
  cleanModal: () => void;
  getProduct: (id: number) => void;
  product: ProductNAInterface | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (id: number) => number;
};

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
        cleanModal,
        getProduct,
        product,
        isOpen,
        setIsOpen,
        getItemQuantity,
      }}
    >
      {children}
      {product && <ProductModal />}
    </ProductContext.Provider>
  );
}
