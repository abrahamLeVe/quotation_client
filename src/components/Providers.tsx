"use client";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart.context";
import { CategoryProvider } from "@/context/category.context";
import { MessagesProvider } from "@/context/messages.context";
import { ProductProvider } from "@/context/product.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <Toaster />
      <ProductProvider>
        <CartProvider>
          <CategoryProvider>
            <QueryClientProvider client={queryClient}>
              <MessagesProvider>{children}</MessagesProvider>
            </QueryClientProvider>
          </CategoryProvider>
        </CartProvider>
      </ProductProvider>
    </SessionProvider>
  );
}
