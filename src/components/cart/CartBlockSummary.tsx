"use client";
import { Disclosure } from "@headlessui/react";
import { BsChevronUp } from "react-icons/bs";

export function CartBlockSummary() {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between">
            <span>Estimación de envío</span>
            <BsChevronUp
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 pt-4 text-gray-500">
            Ingrese su dirección para obtener una estimación de costo de envío.
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
