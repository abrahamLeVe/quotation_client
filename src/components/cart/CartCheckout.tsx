"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { BsCart, BsCreditCard } from "react-icons/bs";
import { Button } from "../ui/button";

export default function CartCheckout() {
  const { subTotal, setOpenCart } = useCartContext();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>{formatCurrency(subTotal)}</p>
      </div>
      <div className="flex gap-2 py-2">
        <Button
          onClick={() => {
            setOpenCart(false);
            router.push(`/cart`);
          }}
          title="Ver carrito"
        >
          <BsCart className="h-6 w-6" /> Ver carrito
        </Button>

        <Button
          onClick={() => {
            setOpenCart(false);
            router.push(`/cart`);
          }}
          title="Check out"
        >
          <BsCreditCard className="h-6 w-6" /> Pagar
        </Button>
      </div>
    </>
  );
}
