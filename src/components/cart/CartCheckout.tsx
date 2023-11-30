"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import { useRouter } from "next/navigation";

export default function CartCheckout() {
  const { subTotal, setOpenCart } = useCartContext();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>{formatCurrency(subTotal)}</p>
      </div>

      <div className="mt-6 relative">
        <button
          onClick={() => {
            setOpenCart(false);
            router.push(`/cart`);
          }}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Ver carrito
        </button>
      </div>
      <div className="mt-6 relative">
        <button
          onClick={() => {
            setOpenCart(false);
            router.push(`/cart`);
          }}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Check out
        </button>
      </div>
    </>
  );
}
