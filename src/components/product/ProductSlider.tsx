"use client";
import { ProductInterface } from "@/models/products.model";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { ArrowButton } from "../slide/ArrowButton";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  data: ProductInterface[];
}

export default function ProductSlider({ data }: ProductSliderProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const itemsPerPage = useMemo(
    () => calculateItemsPerPage(windowWidth),
    [windowWidth]
  );
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const handleButtonClick = (newPage: number) => {
    setIsShowing(false);

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsShowing(true);
    }, 100);
  };

  const prevPage = () => {
    handleButtonClick((currentPage - 1 + totalPages) % totalPages);
  };

  const nextPage = () => {
    handleButtonClick((currentPage + 1) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    handleButtonClick(pageIndex);
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextPage();
    }, 50000);

    return () => {
      clearInterval(autoSlideInterval);
    };
  });

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentProducts = data.slice(startIdx, endIdx);

  return (
    <section className="w-full z-30">
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transform transition duration-[400ms] ease-in-out"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform transition duration-200 ease-in-out"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className=" flex flex-row gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col w-full justify-between  sm:w-[50%] md:w-[33.333%] lg:w-[25%] xl:w-[20%] border rounded-lg overflow-hidden relative text-sm"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Transition>

      <ArrowButton
        onClick={prevPage}
        direction="left"
        className={`${isShowing ? "" : "pointer-events-none"}`}
      />
      <ArrowButton
        onClick={prevPage}
        direction="right"
        className={`${isShowing ? "" : "pointer-events-none"}`}
      />
      <div className="flex top-4 justify-center py-4 gap-2">
        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <div
            key={pageIndex}
            onClick={() => goToPage(pageIndex)}
            className="cursor-pointer z-40"
          >
            <FaCircle
              className={`h-4 w-4  ${
                pageIndex === currentPage ? "text-indigo-600" : ""
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function calculateItemsPerPage(windowWidth: number): number {
  const XLARGE_SCREEN = 1200;
  const LARGE_SCREEN = 976;
  const MEDIUM_SCREEN = 768;

  const breakpoints = [XLARGE_SCREEN, LARGE_SCREEN, MEDIUM_SCREEN];
  const itemsPerPage = [5, 4, 3, 2];

  for (let i = 0; i < breakpoints.length; i++) {
    if (windowWidth >= breakpoints[i]) {
      return itemsPerPage[i];
    }
  }

  return itemsPerPage[itemsPerPage.length - 1];
}
