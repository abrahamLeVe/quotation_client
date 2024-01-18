"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import Link from "next/link";
import { BsCart, BsCreditCard } from "react-icons/bs";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

export default function CartCheckout() {
  const { subTotal, isLoading } = useCartContext();
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
        <Button className="relative">
          <Link
            href={"/cart"}
            title="Ver carrito"
            prefetch
            scroll={false}
            className="absolute inset-0"
          ></Link>
          <BsCart className="h-[1.2rem] w-[1.2rem]" /> Ver carrito
        </Button>
        <Button className="relative">
          <Link
            href={"/cart"}
            title="Pagar"
            prefetch
            scroll={false}
            className="absolute inset-0"
          ></Link>
          <BsCreditCard className="h-[1.2rem] w-[1.2rem]" /> Pagar
        </Button>
      </div>
    </div>
  );
}
