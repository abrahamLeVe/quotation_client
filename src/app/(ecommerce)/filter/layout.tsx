"use client";
import { CartButtonAction } from "@/components/cart/CartButtonAction";
import FilterSlider from "@/components/filter/FilterSlider";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isFilterVisible, setIsFilterVisible] = useState(false);

  // const toggleFilterVisibility = () => {
  //   setIsFilterVisible((prev) => !prev);
  // };

  return (
    <>
      <NavBar />
      <main className="flex overflow-hidden flex-row max-w-screen-xl  mx-auto gap-5 relative p-3 md:p-5">
        <FilterSlider />
        <div className={`w-full min-h-screen mt-10 flex flex-col gap-3 z-10`}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
