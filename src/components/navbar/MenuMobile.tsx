"use client";
import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { HiBars3 } from "react-icons/hi2";
import SlideOver from "../ui/SlideOver";
import { navigation } from "./MenuFlyout";
import Link from "next/link";

export default function MenuMobile() {
  const [open, setOpen] = useState(false);
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <button
        type="button"
        className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open menu</span>
        <HiBars3 className="h-6 w-6" aria-hidden="true" />
      </button>
      <SlideOver openMenu={open} setOpenMenu={setOpen}>
        {/* Links */}
        <Tab.Group as="div" className="mt-2">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8 px-4">
              {navigation.categories.map((category) => (
                <Tab
                  key={category.id}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-900",
                      "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                    )
                  }
                >
                  {category.name}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            {navigation.categories.map((category) => (
              <Tab.Panel
                key={category.id}
                className="space-y-10 px-4 pb-8 pt-10"
              >
                <div className="grid grid-cols-2 gap-x-4">
                  {category.featured.map((item, index) => (
                    <div key={index} className="group relative text-sm">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          className="object-cover object-center"
                        />
                      </div>
                      <a
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        <span
                          className="absolute inset-0 z-10"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                      <p aria-hidden="true" className="mt-1">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
                {category.sections.map((section) => (
                  <div key={section.id}>
                    <p
                      id={`${category.id}-${section.id}-heading-mobile`}
                      className="font-medium text-gray-900"
                    >
                      {section.name}
                    </p>
                    <ul
                      role="list"
                      aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                      className="mt-6 flex flex-col space-y-6"
                    >
                      {section.items.map((item, index) => (
                        <li key={index} className="flow-root">
                          <a
                            href={item.href}
                            className="-m-2 block p-2 text-gray-500"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
          {navigation.pages.map((page, index) => (
            <div key={index} className="flow-root">
              <a
                href={page.href}
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                {page.name}
              </a>
            </div>
          ))}
        </div>
        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
          <>
            <Link href="/signin" className="flow-root">
              Ingresar
            </Link>
            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <Link href="/register" className="flow-root">
              Registrarse
            </Link>
          </>
        </div>
        <div className="border-t border-gray-200 px-4 py-6">
          <a href="#" className="-m-2 flex items-center p-2">
            <img
              src="https://tailwindui.com/img/flags/flag-canada.svg"
              alt=""
              className="block h-auto w-5 flex-shrink-0"
            />
            <span className="ml-3 block text-base font-medium text-gray-900">
              CAD
            </span>
            <span className="sr-only">, change currency</span>
          </a>
        </div>
      </SlideOver>
    </>
  );
}
