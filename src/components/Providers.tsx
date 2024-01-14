"use client";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart.context";
import { CategoryProvider } from "@/context/category.context";
import { FilterProvider } from "@/context/filter.context";
import { ProductProvider } from "@/context/product.context";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <SessionProvider>
        <Toaster />
        <ProductProvider>
          <CartProvider>
            <CategoryProvider>
              <FilterProvider>{children}</FilterProvider>
            </CategoryProvider>
          </CartProvider>
        </ProductProvider>
      </SessionProvider>
    </>
  );
}
