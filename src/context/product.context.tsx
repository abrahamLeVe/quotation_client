"use client";
import ProductModal from "@/components/product/ProductModal";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { createContext, useContext, useState } from "react";

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  product: ProductInterface | undefined;
  getProduct: (id: number) => void;
  getProductBySlug: (slug: string) => void;
  getItemQuantity: (id: number) => number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductInterface | undefined>
  >;
  cleanProductModal: () => void;
}

const ProductContext = createContext({} as ProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const products = productStorage((state) => state.productState);
  const [product, setProduct] = useState<ProductInterface>();
  const [isOpen, setIsOpen] = useState(false);
  const cart = cartStore((state) => state);

  function getProduct(id: number) {
    const item = products.data.find((item: ProductInterface) => item.id === id);
    setIsOpen(true);
    setProduct(item);
  }

  function getProductBySlug(slug: string) {
    const item = products.data.find(
      (item: ProductInterface) => item.attributes.slug === slug
    );
    setProduct(item);
  }

  function getItemQuantity(id: number) {
    return cart.cartItemState.find((item) => item.id === id)?.quantity || 0;
  }

  function cleanProductModal() {
    setProduct(undefined);
    setIsOpen(false);
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
        getProductBySlug,
      }}
    >
      {children}
      {product && <ProductModal />}
    </ProductContext.Provider>
  );
}
