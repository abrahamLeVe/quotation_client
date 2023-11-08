"use client";
import { useProduct } from "@/context/productModal";
import { cartStore } from "@/store/cart.store";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { CartButton } from "./ProductCarousel";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export default function ProductModal() {
  const { product, setIsOpen, isOpen, getItemQuantity } = useProduct();
  const cart = cartStore((state) => state);
  let btnModalProductRef = useRef(null);

  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    autoPlay: true,
  };
  console.log(product);
  return (
    <>
      <Transition.Root appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setIsOpen}
          initialFocus={btnModalProductRef}
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[90%] max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col lg:flex-row gap-5">
                    <div>
                      <ImageGallery
                        items={product!.attributes.image.data.map((item) => ({
                          original: item.attributes.url,
                          thumbnail: item.attributes.formats.thumbnail.url,
                          slideToIndex: item.id,
                        }))}
                        {...imageGalleryOptions}
                        thumbnailPosition="left"
                      />
                    </div>
                    <div className="flex gap-3 flex-col lg:w-[45%]">
                      <div className="flex flex-col gap-3 ">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
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
                          <li className="flex flex-wrap gap-2">
                            <span className="font-semibold"> Categorías: </span>
                            {product!.attributes.categories.data.map(
                              (category) => (
                                <a
                                  href="#"
                                  className="underline hover:text-indigo-600"
                                  key={category.id}
                                >
                                  {category.attributes.name.toLocaleLowerCase()}
                                </a>
                              )
                            )}
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
