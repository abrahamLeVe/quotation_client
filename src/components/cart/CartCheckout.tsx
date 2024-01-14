"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { BsCart, BsCreditCard } from "react-icons/bs";
import { Button } from "../ui/button";
import { Icons } from "../Icons";

export default function CartCheckout() {
  const { subTotal, isLoading } = useCartContext();
  const router = useRouter();
  return (
    <div className="w-full py-4 border-t">
      <div className="flex text-base font-medium  gap-2 justify-end items-center">
        <p>Subtotal:</p>
        {isLoading ? (
          <Icons.spinner className="h-5 w-5 animate-spin " aria-hidden="true" />
        ) : (
          <p className="text-red-600">{formatCurrency(subTotal)}</p>
        )}
      </div>
      <div className="flex gap-2 py-2  justify-end">
        <Button
          onClick={() => {
            router.push(`/cart`);
          }}
          title="Ver carrito"
        >
          <BsCart className="h-6 w-6" /> Ver carrito
        </Button>

        <Button
          onClick={() => {
            router.push(`/cart`);
          }}
          title="Check out"
        >
          <BsCreditCard className="h-6 w-6" /> Pagar
        </Button>
      </div>
    </div>
  );
}
