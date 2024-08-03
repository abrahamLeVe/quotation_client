"use client";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart.context";
import { MessagesProvider } from "@/context/messages.context";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Toaster />
      <CartProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </CartProvider>
    </SessionProvider>
  );
}
