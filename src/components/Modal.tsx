import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { GrClose } from "react-icons/gr";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  child: ReactNode;
}

export default function Modal({ isOpen, setIsOpen, child }: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40" onClose={setIsOpen}>
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          {transitionChild(
            <div
              className="absolute inset-0 bg-gray-500 opacity-75 "
              onClick={() => setIsOpen(false)}
            />
          )}
          {transitionChild(
            <div className="relative">
              {child}
              <button
                type="button"
                className="flex absolute h-8 w-8 -top-2 right-0 border rounded-full bg-white hover:bg-gray-200 justify-center items-center z-50"
                onClick={() => setIsOpen(false)}
              >
                <GrClose className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function transitionChild(child: ReactNode) {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {(ref) => <div ref={ref}>{child}</div>}
    </Transition.Child>
  );
}
