"use client";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { cartStore } from "@/store/cart.store";
import dynamic from "next/dynamic";
const CartSummary = dynamic(
  () => import("@/components/cart/message/CartSummary"),
  {
    ssr: false,
  }
);

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = cartStore((state) => state);

  return (
    <>
      <main className="flex flex-col md:container m-auto relative p-20">
        <Breadcrumbs
          segments={[
            {
              title: "Carrito",
              href: "/cart",
            },
            {
              title: "Cotización",
              href: "",
            },
          ]}
        />
        <div className="p-4 py-6 sm:px-6 w-full min-h-screen">
          <div className="text-lg font-medium ">
            Datos y productos de la cotización
          </div>
          <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
            {cart.cartItemState.length === 0 ? (
              <>Carrito vacío</>
            ) : (
              <>
                {children}
                <CartSummary isCart={false} />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
