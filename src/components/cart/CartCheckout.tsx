"use client";
import { useCartContext } from "@/context/cart.context";
import { formatCurrency } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import { BsCart, BsCreditCard } from "react-icons/bs";
import { CartButtonAction } from "./CartButtonAction";

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
        <CartButtonAction
          onClick={() => {
            setOpenCart(false);
            router.push(`/cart`);
          }}
          title="Ver carrito" 
          icon={<BsCart />}
        />
      </div>
      <div className="mt-6 relative">
        <CartButtonAction
          title="Check out"
          onClick={() => {
            setOpenCart(false);
            router.push(`/cart`);
          }}
          icon={<BsCreditCard />}
        />
      </div>
    </>
  );
}
