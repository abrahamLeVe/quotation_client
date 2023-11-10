"use client";
import { useSpeechFilter } from "@/context/speechFilter";
import React from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CartButton } from "../product/ProductCarousel";

export default function FilterSection() {
  const { filterProducts, cleanFilter, filterByPrice, minPrice, maxPrice } =
    useSpeechFilter();

  return (
    <div className="flex flex-col min-w-[320px] h-full p-5 border-r-2 gap-3">
      <form className="flex gap-2 items-end">
        <div>
          <label
            htmlFor="query"
            className="text-lg font-bold tracking-tight text-gray-900 pb-3"
          >
            Buscador de productos
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <BsSearch className="h-3 w-3 text-gray-600" aria-hidden="true" />
            </div>
            <input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                filterProducts(event.target.value)
              }
              placeholder="Anillo, billetera, reloj, auriculares"
              maxLength={50}
              type="text"
              name="query"
              id="query"
              className="block w-full rounded-md border-0 py-2 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
            />
          </div>
        </div>

        <div title="Limpiar">
          <CartButton
            onClick={cleanFilter}
            icon={<AiOutlineClear className="text-gray-600" />}
            className="max-w-[42px]"
          />
        </div>
      </form>

      <div className="flex flex-col w-full gap-3">
        <h3 className="text-lg font-bold text-gray-900">Filtrar por precio</h3>
        <label>Precio a partir de:</label>
        <input
          type="range"
          min="0"
          max={maxPrice}
          onChange={(event) => filterByPrice(event.target.value)}
          className="block w-full appearance-none bg-gray-400 h-3 rounded-lg overflow-hidden outline-none"
        />
        <div className="flex justify-between text-gray-600">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>
    </div>
  );
}
