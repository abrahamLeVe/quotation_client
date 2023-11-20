"use client";
import { CartProvider } from "@/context/cart.context";
import { ProductProvider } from "@/context/product.context";
import { FilterProvider } from "@/context/filter.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <FilterProvider>
            <CartProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
            </CartProvider>
          </FilterProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
