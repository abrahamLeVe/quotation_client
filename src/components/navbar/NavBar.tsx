"use client";
import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import CartSliderOver from "../cart/CartSliderOver";
import FilterButton, { SpeachButton } from "../filter/FilterButton";
import { Card } from "../ui/card";
import { ModeToggle } from "../ui/mode-toggle";
import AuthMenu from "./MenuAuth";
import FlyoutMenu from "./MenuFlyout";
const MenuMobile = dynamic(() => import("./MenuMobile"), {
  ssr: false,
});

interface NavBarProps {
  isCart?: boolean;
  background: StaticImageData;
  categories?: CategoriesInterface;
  brands?: BrandsInterface;
  isDashboard?: boolean;
}
export default function NavBar({
  isCart = false,
  isDashboard,
  background,
  categories,
  brands,
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md my-2 bg-white/90 dark:bg-slate-950/90">
      <nav aria-label="Top" className="mx-auto  container px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center gap-2">
            {/* Logo */}
            <Card className="hidden relative w-[150px]  h-16 xs:flex items-center dark:bg-slate-50">
              <Image src={background} alt="DSStore" priority={true} />
              <Link
                href={"/"}
                className="absolute inset-0"
                aria-label="DSStore"
              ></Link>
            </Card>

            {/* Flyout menus */}

            <div className="hidden lg:flex">
              {!isDashboard ? (
                <FlyoutMenu categories={categories} brands={brands} />
              ) : (
                <></>
              )}
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex">
                <ModeToggle />
                <SpeachButton className={""} />
              </div>
              {/* Filter */}
              <FilterButton />
              {/* Cart */}
              {isCart ? <></> : <CartSliderOver />}

              <div className="ml-3">
                <AuthMenu />
              </div>
            </div>

            <div className="flex lg:hidden">
              {!isDashboard ? (
                <MenuMobile categories={categories} brands={brands} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
