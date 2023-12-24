"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { BsCart, BsCreditCard } from "react-icons/bs";
import { Button } from "../ui/button";

export default function CartCheckout() {
  const { subTotal } = useCartContext();
  const router = useRouter();
  return (
    <div className="w-full py-4 border-t">
      <div className="flex text-base font-medium text-gray-900 gap-2 justify-end">
        <p>Subtotal:</p>
        <p>{formatCurrency(subTotal)}</p>
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
