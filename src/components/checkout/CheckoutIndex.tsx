"use client";
import { cartStore } from "@/store/cart.store";
import dynamic from "next/dynamic";

const CartSummary = dynamic(() => import("../cart/message/CartSummary"), {
  ssr: false,
});

export default function CheckoutIndex() {
  const cart = cartStore((state) => state);
  return (
    <div className="p-4 py-6 sm:px-6 w-full min-h-screen">
      <div className="text-lg font-medium ">
        Datos y productos de la cotización
      </div>
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
        {cart.cartItemState.length === 0 ? (
          <>Carrito vacío</>
        ) : (
          <>
            <CartSummary isCart={false} />
          </>
        )}
      </div>
    </div>
  );
}
