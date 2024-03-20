"use client";
import dynamic from "next/dynamic";
import CartProducts from "./CartProducts";
const ResumeCartMessage = dynamic(() => import("./message/ResumeCartMessage"), {
  ssr: false,
});

export default function CartIndex() {
  return (
    <div className="px-4 py-6 sm:px-6 w-full min-h-screen">
      <div className="text-lg font-medium ">Carrito de compras</div>
      <div className="flex flex-col lg:flex-row mt-8 relative gap-4 ">
        <CartProducts />
        <ResumeCartMessage />
      </div>
    </div>
  );
}
