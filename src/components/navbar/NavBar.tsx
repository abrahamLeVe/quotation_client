"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import CartSliderOver from "../cart/CartSliderOver";
import FilterButton from "../filter/FilterButton";
import { Button } from "../ui/button";
import FlyoutMenu from "./MenuFlyout";
import MenuMobile from "./MenuMobile";

export default function NavBar() {
  const { data: session } = useSession();
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
                    {!session ? (
                      <>
                        <Link href="/signin" className="flow-root">
                          Ingresar
                        </Link>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <Link href="/register" className="flow-root">
                          Registrarse
                        </Link>
                      </>
                    ) : (
                      <Button
                        onClick={() =>
                          signOut({ redirect: true, callbackUrl: "/" })
                        }
                        className="flow-root"
                      >
                        Salir
                      </Button>
                    )}
                  </div>

                  {/* Filter */}
                  <FilterButton />

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <CartSliderOver />
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
