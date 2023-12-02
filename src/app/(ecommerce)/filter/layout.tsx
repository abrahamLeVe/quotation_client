"use client";
import { CartButtonAction } from "@/components/cart/CartButtonAction";
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
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <>
      <NavBar />
      <main className="flex overflow-hidden flex-row max-w-screen-xl  mx-auto gap-5 relative p-3 md:p-5">
        <Transition
          as="div"
          show={isFilterVisible}
          onClick={toggleFilterVisibility}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={"absolute inset-0 bg-black/25 transition-opacity z-20"}
        />

        <div
          className={`absolute top-0 left-0 z-30 transition-transform ${
            isFilterVisible ? "" : "-translate-x-56"
          }`}
        >
          <div className="relative">
            <CartButtonAction
              onClick={toggleFilterVisibility}
              className="absolute top-0 -right-20 max-w-[80px]"
              icon={
                <BsChevronRight
                  className={`m-auto ${
                    isFilterVisible ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              }
              title="Filtro"
            />

            <div className={`w-56 bg-white min-h-screen`}>Filtro</div>
          </div>
        </div>

        <div className={`w-full min-h-screen mt-10 flex flex-col  z-10`}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
