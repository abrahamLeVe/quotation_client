"use client";
import { useProductContext } from "@/context/product.context";
import { cartStore } from "@/store/cart.store";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { ImageGalleryModal } from "../ui/ImageGallery";
import TransitionChild from "../ui/TransitionChild";
import ProductDetail from "./ProductDetail";

export default function ProductModal() {
  const router = useRouter();
  let btnModalProductRef = useRef(null);
  const { product, setIsOpen, isOpen, getItemQuantity } = useProductContext();
  const cart = cartStore((state) => state);

  return (
    <>
      <Transition.Root appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsOpen}
          initialFocus={btnModalProductRef}
        >
          <TransitionChild />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[90%] max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col lg:flex-row gap-5">
                    <div>
                      <ImageGalleryModal
                        attributes={product[0].attributes}
                        id={product[0].id}
                      />
                    </div>
                    <div className="flex gap-3 flex-col lg:w-[45%]">
                      <div className="flex flex-col gap-2">
                        {/* Details */}
                        <ProductDetail product={product[0]} isPage />

                        <div>
                          <span className="font-semibold">
                            Descripción completa:{" "}
                          </span>
                          <button
                            onClick={() => {
                              router.push(
                                `/product/${product[0].attributes.slug}`
                              );
                              setIsOpen(false);
                            }}
                            className="hover:underline"
                          >
                            Click aquí
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex absolute h-8 w-8 top-0 right-0 border rounded-full bg-white hover:bg-gray-200 justify-center items-center z-50"
                      onClick={() => setIsOpen(false)}
                      title="Cerrar"
                      ref={btnModalProductRef}
                    >
                      <GrClose className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
