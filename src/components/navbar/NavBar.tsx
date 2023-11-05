"use client";
import { useCart } from "@/context/cartModal";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { HiBars3, HiOutlineShoppingBag } from "react-icons/hi2";
import ButtonAcount from "./ButtonAcount";
import FlyoutMenu from "./FlyoutMenu";
import MenuMobile from "./MenuMobile";

export default function NavBar() {
  const { cartQuantity, setOpenCart, openMenu, setOpenMenu } = useCart();
  const mounted = useMounted();

  return (
    <>
      <header className="bg-white">
        <div className="relative bg-white">
          <div className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            <p>Get free delivery on orders over $100</p>
          </div>

          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpenMenu(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <HiBars3 className="h-6 w-6" aria-hidden="true" />
                </button>

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

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <a
                      href="#"
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <BsSearch className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>
                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <button
                      onClick={() => {
                        cartQuantity > 0 && setOpenCart(true);
                      }}
                      className="group -m-2 flex items-center p-2 relative"
                    >
                      <HiOutlineShoppingBag
                        className="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <div className="border rounded-full w-6 h-6 absolute top-0 -right-1">
                        <p className="text-sm">{mounted ? cartQuantity : 0}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* Mobile menu */}
        <MenuMobile openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </header>
    </>
  );
}
