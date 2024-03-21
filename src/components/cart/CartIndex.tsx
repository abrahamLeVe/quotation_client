"use client";
import CartProducts from "./CartProducts";
import ResumeCartMessage from "./message/ResumeCartMessage";

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
