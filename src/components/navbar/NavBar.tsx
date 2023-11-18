"use client";
import { useCartContext } from "@/context/cart.context";
import { useProductContext } from "@/context/product.context";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ButtonSpeech from "../filter/ButtonSpeech";
import ButtonAcount from "./MenuAuth";
import FlyoutMenu from "./MenuFlyout";
import MenuMobile from "./MenuMobile";

export default function NavBar() {
  const { cartQuantity, setOpenCart } = useCartContext();
  const { cleanProductModal } = useProductContext();

  return (
    <>
      <header className="bg-white">
        <div className="relative bg-white">
          <div className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            <p>Entrega gratuita en pedidos superiores a $100</p>
          </div>

          <nav
            aria-label="Top"
            className="mx-auto  max-w-screen-xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <MenuMobile />
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0 relative w-[50px]">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="mi empresa"
                  />
                  <Link href={"/"} className="absolute inset-0"></Link>
                </div>

                {/* Flyout menus */}
                <FlyoutMenu />

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <ButtonAcount />
                  </div>

                  {/* Filter */}
                  <ButtonSpeech />

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <button
                      onClick={() => {
                        cartQuantity > 0 &&
                          (setOpenCart(true), cleanProductModal());
                      }}
                      className="p-2 text-gray-400 hover:text-gray-500 relative"
                    >
                      <HiOutlineShoppingBag
                        className="h-7 w-7 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div className="border rounded-full w-6 h-6 absolute top-0 -right-1">
                        <p className="text-sm">{cartQuantity}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
