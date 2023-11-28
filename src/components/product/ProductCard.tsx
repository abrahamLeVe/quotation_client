"use client";

import { useProductContext } from "@/context/product.context";
import { Brand, Categories } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import Link from "next/link";
import { BsCartCheck, BsCartPlus, BsEye } from "react-icons/bs";
import { CartButtonAction } from "../cart/CartButtonAction";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export interface ProductSliderItem {
  key: number;
  url: string;
  alt: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  rating: number;
  brand?: Brand;
  brandLink?: string;
  categories: Categories;
}

export default function ProductCard({
  product,
}: {
  product: ProductSliderItem;
}) {
  const cart = cartStore((state) => state);
  const { openProductModal, getItemQuantity } = useProductContext();

  return (
    <>
      <div className="flex flex-col">
        <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.url}
            alt={product.alt}
            className="w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col p-2 gap-2">
          <h3
            className=" text-gray-900 hover:text-black hover:underline relative"
            title={product.name}
          >
            {truncate(product.name, 60)}
            <Link
              href={`/product/${product.slug}`}
              className="absolute inset-0"
            ></Link>
          </h3>
          <div className="flex gap-2">
            <ProductPrice
              discount={product.discount}
              price={product.price}
              popUp
            />
          </div>
          {product.brand?.data ? (
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold"> Marca: </span>
              <Link
                href={`/product/filter?query=${product.brand.data?.attributes.name}`}
                className="underline text-gray-700 hover:text-gray-900"
              >
                {product.brand.data?.attributes.name}
              </Link>
            </div>
          ) : (
            <></>
          )}
          <ProductRating rating={product.rating} />
          {product.categories.data.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Categorías:</span>
              {product.categories.data.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/filter?query=${item.attributes.name}`}
                  className="underline text-gray-700 hover:text-gray-900"
                >
                  {item.attributes.name}
                </Link>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex justify-end p-3 gap-2">
        <CartButtonAction
          onClick={() => openProductModal(product.key)}
          title="Detalles"
          icon={<BsEye />}
        />
        {getItemQuantity(product.key) ? (
          <>
            <CartButtonAction
              onClick={() => cart.increaseCartQuantity(product.key)}
              title={`x ${getItemQuantity(product.key)}`}
              icon={<BsCartCheck />}
            />
          </>
        ) : (
          <>
            <CartButtonAction
              onClick={() => cart.increaseCartQuantity(product.key)}
              title="Añadir"
              icon={<BsCartPlus />}
            />
          </>
        )}
      </div>
    </>
  );
}
