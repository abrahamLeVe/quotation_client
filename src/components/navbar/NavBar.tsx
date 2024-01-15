"use client";
import Link from "next/link";
import CartSliderOver from "../cart/CartSliderOver";
import FilterButton from "../filter/FilterButton";
import { ModeToggle } from "../ui/mode-toggle";
import AuthMenu from "./MenuAuth";
import FlyoutMenu from "./MenuFlyout";
import MenuMobile from "./MenuMobile";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md my-2 bg-white/90 dark:bg-slate-950/90 scroll-auto">
      <div className="relative">
        <nav
          aria-label="Top"
          className="mx-auto  container px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center gap-2">
              <div className="flex lg:hidden">
                <MenuMobile />
              </div>
              {/* Logo */}
              <div className="relative w-[50px] h-[50px]">
                <img
                  className="aspect-square w-full object-cover"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="DSStore"
                />
                <Link
                  href={"/"}
                  className="absolute inset-0"
                  aria-label="DSStore"
                ></Link>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:flex">
                <FlyoutMenu />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="hidden lg:flex">
                  <AuthMenu />
                </div>
                {/* Filter */}
                <FilterButton />
                {/* Cart */}
                <div>
                  <CartSliderOver />
                </div>
                <ModeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
