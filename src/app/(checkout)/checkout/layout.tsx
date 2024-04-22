"use client";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import background from "../../../../public/logoAyC.png";

import { Card } from "@/components/ui/card";
import { useCartContext } from "@/context/cart.context";
import dynamic from "next/dynamic";
import Image from "next/image";
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
  const { isLoading } = useCartContext();

  return (
    <>
      <main
        className={`flex flex-col md:container m-auto relative p-3 ${
          isLoading && "pointer-events-none"
        }`}
      >
        <Card className="relative w-[180px] h-20  flex items-center dark:bg-slate-50 ml-auto">
          <Image src={background} alt="DSStore" />
        </Card>
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
            <>
              {children}
              <CartSummary isCart={false} />
            </>
          </div>
        </div>
      </main>
    </>
  );
}
