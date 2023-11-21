"use client";
import { useFilterContext } from "@/context/filter.context";
import { useProductContext } from "@/context/product.context";
import { cartStore } from "@/store/cart.store";
import { capitalizeFirstLetter } from "@/utilities/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import ImageGalleryIndex from "../ui/ImageGallery";
import TransitionChild from "../ui/TransitionChild";
import { CartButton } from "./ProductCard";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export default function ProductModal() {
  const { product, setIsOpen, isOpen, getItemQuantity } = useProductContext();
  const cart = cartStore((state) => state);
  const { filterProductsByCategoryId, setResultText } = useFilterContext();
  const router = useRouter();
  let btnModalProductRef = useRef(null);

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
                      <ImageGalleryIndex
                        attributes={product!.attributes}
                        id={product!.id}
                      />
                    </div>
                    <div className="flex gap-3 flex-col lg:w-[45%]">
                      <div className="flex flex-col gap-3 ">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6"
                        >
                          {product!.attributes.name}
                        </Dialog.Title>
                        <ProductRating rating={product!.attributes.rating} />
                        <div className="flex flex-row gap-5">
                          <ProductPrice
                            discount={product!.attributes.discount}
                            price={product!.attributes.price}
                          />
                          {getItemQuantity(product!.id) > 0 && (
                            <p>x{getItemQuantity(product!.id)}</p>
                          )}
                        </div>

                        <ul>
                          <li>
                            <span className="font-semibold">
                              Disponibilidad:{" "}
                            </span>
                            En stock
                          </li>
                          <li className="flex flex-wrap">
                            <span className="font-semibold"> Categorías: </span>
                            {product!.attributes.categories.data.map(
                              (category) => (
                                <div
                                  key={category.id}
                                  className="relative hover:underline mx-2"
                                >
                                  <p className="font-medium text-gray-900 ">
                                    {capitalizeFirstLetter(
                                      category.attributes.name
                                    )}
                                  </p>
                                  <button
                                    onClick={() => {
                                      filterProductsByCategoryId(category.id);
                                      setResultText(category.attributes.name);
                                      router.push("/filter");
                                      setIsOpen(false);
                                    }}
                                    className="absolute inset-0 w-full"
                                  ></button>
                                </div>
                              )
                            )}
                          </li>
                          <li className="flex gap-1">
                            <span className="font-semibold">
                              Descripción completa:
                            </span>
                            <button
                              onClick={() => {
                                router.push(
                                  `/product/${product!.attributes.slug}`
                                );
                                setIsOpen(false);
                              }}
                              className="hover:underline"
                            >
                              Click aquí
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {getItemQuantity(product!.id) > 0 && (
                          <>
                            <CartButton
                              onClick={() => cart.removeCartItem(product!.id)}
                              title="Eliminar"
                              icon={<MdDeleteOutline />}
                            />

                            <CartButton
                              onClick={() =>
                                cart.decreaseCartQuantity(product!.id)
                              }
                              title="Quitar"
                              icon={<BsCartDash />}
                            />
                          </>
                        )}
                        <CartButton
                          onClick={() => cart.increaseCartQuantity(product!.id)}
                          title="Añadir"
                          icon={<BsCartPlus />}
                        />
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
