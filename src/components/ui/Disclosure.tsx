"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { BsChevronUp } from "react-icons/bs";

interface DisclosureIndexProps {
  title: string;
  child: React.ReactNode;
}

export function DisclosureIndex({ title, child }: DisclosureIndexProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between font-semibold p-4">
            <span>{title}</span>
            <BsChevronUp
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pb-2  text-gray-500">
              <>{child}</>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
