"use client";
import { ProductNAInterface } from "@/models/newArrivals.model";
import { Dialog } from "@headlessui/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from "../Modal";
import { ButtonAddToCart } from "./ProductButton";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductNAInterface;
}

export default function ProductModal({
  isOpen,
  setIsOpen,
  product,
}: ProductModalProps) {
  
  const images = product.attributes.image.data.map((item) => ({
    original: item.attributes.url,
    thumbnail: item.attributes.formats.thumbnail.url,
    key: item.id,
  }));

  const { attributes } = product;
  const { discount, price, name, rating, categories } = attributes;

  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    autoPlay: true,
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        child={
          <>
            <div className="flex flex-col lg:flex-row max-w-screen-l overflow-y-auto max-h-[80vh] p-3 mx-3 text-left align-middle bg-white rounded-2xl gap-4">
              <div className="aspect-w-3">
                <ImageGallery
                  items={images}
                  {...imageGalleryOptions}
                  thumbnailPosition="left"
                />
              </div>

              <div className="flex flex-col lg:w-[50%] gap-3 p-3">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {name.toUpperCase()}
                </Dialog.Title>
                <ProductRating rating={rating} />
                <ProductPrice discount={discount} price={price} />
                <div>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <span className="font-semibold"> Disponibilidad: </span>
                      En stock
                    </li>
                    <li className="flex flex-wrap gap-2">
                      <span className="font-semibold"> Categorías: </span>
                      {categories.data.map((category) => (
                        <a
                          href="#"
                          className="underline hover:text-indigo-600"
                          key={category.id}
                        >
                          {category.attributes.name.toLocaleLowerCase()}
                        </a>
                      ))}
                    </li>
                  </ul>
                </div>
                <div className="flex justify-start">
                  <ButtonAddToCart product={product} isModal={true} />
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
