"use client";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import CartOffCanvas from "../cart/CartOffCanvas";

export default function NavbarCartButton() {
  const { cartItems } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  return (
    <>
      <button
        onClick={openCart}
        className="group -m-2 flex items-center p-2 relative"
      >
        <HiOutlineShoppingBag
          className="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="text-sm font-medium border rounded-full w-6 h-6 absolute top-0 -right-1">
          {cartItems.length}
        </span>
      </button>
      <CartOffCanvas isOpen={isOpen} closeCart={closeCart} />
    </>
  );
}
