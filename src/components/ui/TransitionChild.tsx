"use client";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TransitionChild() {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/25 transition-opacity" />
    </Transition.Child>
  );
}
