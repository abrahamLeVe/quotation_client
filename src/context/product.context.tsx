"use client";
import { getDataProducts } from "@/app/services/product.service";
import ProductModal from "@/components/product/ProductModal";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  product: ProductInterface | undefined;
  products: ProductInterface[];
  getProduct: (id: number) => void;
  getProductBySlug: (slug: string) => void;
  getItemQuantity: (id: number) => number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductInterface | undefined>
  >;
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  cleanProductModal: () => void;
}

const ProductContext = createContext({} as ProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [product, setProduct] = useState<ProductInterface>();
  const [products, setProducts] = useState<ProductInterface[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const cart = cartStore((state) => state);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDataProducts();
        if (data) {
          setProducts(data);
          console.log("into usereffect getproductdata ", data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function getProduct(id: number) {
    const item = products.find((item: ProductInterface) => item.id === id);
    setIsOpen(true);
    setProduct(item);
  }

  function getProductBySlug(slug: string) {
    const item = products.find(
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
        products,
        setProducts,
      }}
    >
      {children}
      {product && <ProductModal />}
    </ProductContext.Provider>
  );
}
