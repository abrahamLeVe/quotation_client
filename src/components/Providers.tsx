"use client";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart.context";
import { MessagesProvider } from "@/context/messages.context";
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
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <MessagesProvider>{children}</MessagesProvider>
        </QueryClientProvider>
      </CartProvider>
    </SessionProvider>
  );
}
