"use client";
import {
  getDataProductById,
  getDataProducts,
} from "@/app/services/product.service";
import ProductModal from "@/components/product/ProductModal";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductProviderProps {
  children: React.ReactNode;
}

interface ProductContext {
  isOpen: boolean;
  product: ProductInterface[];
  products: ProductInterface[];
  openProductModal: (id: number) => void;
  getItemQuantity: (id: number) => number | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProduct: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
  cleanProductModal: () => void;
}

const ProductContext = createContext({} as ProductContext);

export function useProductContext() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [product, setProduct] = useState<ProductInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const cart = cartStore((state) => state);

  const mounted = useMounted();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDataProducts();
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function openProductModal(id: number) {
    setIsOpen(true);
    try {
      const { data } = await getDataProductById(id);
      setProduct(data);
    } catch (error) {
      console.log("Error in openProductModal(id)", error);
      cleanProductModal();
    }
  }

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
        openProductModal,
        setIsOpen,
        getItemQuantity,
        setProduct,
        cleanProductModal,
        products,
        setProducts,
      }}
    >
      {children}
      {product[0] ? <ProductModal /> : null}
    </ProductContext.Provider>
  );
}
