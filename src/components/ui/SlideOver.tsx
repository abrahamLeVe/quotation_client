"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { GrClose } from "react-icons/gr";

interface SlideOverProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function SlideOver({
  openMenu,
  setOpenMenu,
  children,
}: SlideOverProps) {
  let buttonSliderOver = useRef(null);

  return (
    <>
      <Transition.Root show={openMenu} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setOpenMenu}
          initialFocus={buttonSliderOver}
        >
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

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-500 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpenMenu(false)}
                    ref={buttonSliderOver}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <GrClose className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Contain */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
