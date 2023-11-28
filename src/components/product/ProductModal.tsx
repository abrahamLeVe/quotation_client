"use client";
import { useProductContext } from "@/context/product.context";
import { cartStore } from "@/store/cart.store";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { CartButtonAction } from "../cart/CartButtonAction";
import ImageGalleryIndex from "../ui/ImageGallery";
import TransitionChild from "../ui/TransitionChild";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

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
                      <ImageGalleryIndex
                        attributes={product[0].attributes}
                        id={product[0].id}
                      />
                    </div>
                    <div className="flex gap-3 flex-col lg:w-[45%]">
                      <div className="flex flex-col gap-2">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6"
                        >
                          {product[0].attributes.name}
                        </Dialog.Title>
                        <div className="flex gap-2">
                          <ProductPrice
                            discount={product[0].attributes.discount}
                            price={product[0].attributes.price}
                            popUp
                          />
                        </div>
                        {product[0].attributes.brand?.data ? (
                          <div className="flex flex-wrap gap-2">
                            <span className="font-semibold"> Marca: </span>
                            <Link
                              href={`/product/filter?query=${product[0].attributes.brand.data?.attributes.name}`}
                              className="underline text-gray-700 hover:text-gray-900"
                            >
                              {
                                product[0].attributes.brand.data?.attributes
                                  .name
                              }
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )}
                        <ProductRating rating={product[0].attributes.rating} />
                        <div>
                          <span className="font-semibold">
                            Disponibilidad:{" "}
                          </span>
                          En stock
                        </div>
                        {product[0].attributes.categories.data.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            <span className="font-semibold">Categorías:</span>
                            {product[0].attributes.categories.data.map(
                              (item) => (
                                <Link
                                  key={item.id}
                                  href={`/product/filter?query=${item.attributes.name}`}
                                  className="underline text-gray-700 hover:text-gray-900"
                                >
                                  {item.attributes.name}
                                </Link>
                              )
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
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
                      <div className="flex flex-wrap justify-end gap-2">
                        {getItemQuantity(product[0].id) ? (
                          <>
                            <CartButtonAction
                              onClick={() => cart.removeCartItem(product[0].id)}
                              title="Eliminar"
                              icon={<MdDeleteOutline />}
                            />

                            <CartButtonAction
                              onClick={() =>
                                cart.increaseCartQuantity(product[0].id)
                              }
                              title={`x ${getItemQuantity(product[0].id)}`}
                              icon={<BsCartCheck />}
                            />
                          </>
                        ) : (
                          <>
                            <CartButtonAction
                              onClick={() =>
                                cart.increaseCartQuantity(product[0].id)
                              }
                              title="Añadir"
                              icon={<BsCartPlus />}
                            />
                          </>
                        )}
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
