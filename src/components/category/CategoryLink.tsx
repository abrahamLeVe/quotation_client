"use client";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CategoriesDataInterface } from "@/models/products.model";
import { BsChevronUp } from "react-icons/bs";

export function CategoryLink({
  categories,
}: {
  categories: CategoriesDataInterface[];
}) {
  return (
    <>
      <Popover className="w-full relative max-w-sm ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-gray-900/90" : "text-black"}
                group inline-flex items-center rounded-md px-3 py-2 hover:text-gray-900 focus:outline-none focus-visible:ring-2`}
            >
              <span className="font-semibold pr-1">Categorías</span>
              <BsChevronUp
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-purple-500 transition duration-150 ease-in-out`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute w-full left-1/2 mt-3 z-20  max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="grid gap-8 p-5 bg-white">
                    {categories.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/filter?query=${item.attributes.name}`}
                        className="-m-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <div className="w-full">
                          <p className="text-sm font-medium text-gray-900">
                            {item.attributes.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
