"use client";
import { useProductContext } from "@/context/product.context";
import {
  ProductInterface,
  ProductPriceInterface,
} from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import Link from "next/link";
import React, { useState } from "react";
import { BsCartCheck, BsCartDash, BsCartPlus, BsEye } from "react-icons/bs";
import { FaCircle } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { CartButtonAction } from "../cart/CartButtonAction";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductDetailProps {
  product: ProductInterface;
  isPage?: boolean;
}

export default function ProductDetail({
  product,
  isPage = false,
}: ProductDetailProps) {
  const [selectedSize, setSize] = useState<ProductPriceInterface>(
    product.attributes.prices.data[0]
  );
  const cart = cartStore((state) => state);
  const { getItemQuantity, setProduct, setIsOpen } = useProductContext();

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeId = parseInt(event.target.value, 10);
    const selectedSize = product.attributes.prices.data.find(
      (price) => price.id === sizeId
    );
    setSize(selectedSize || product.attributes.prices.data[0]);
  };

  return (
    <>
      {/* details */}
      <h3 className=" text-gray-900 relative" title={product.attributes.name}>
        {!isPage ? (
          <>{truncate(product.attributes.name, 60)}</>
        ) : (
          <>{product.attributes.name}</>
        )}
      </h3>

      {selectedSize && (
        <div className="flex gap-2">
          <ProductPrice
            discount={selectedSize.attributes.discount || 0}
            price={selectedSize.attributes.value || 0}
            popUp
          />
        </div>
      )}

      {product.attributes.brand?.data ? (
        <div className="flex flex-wrap gap-2">
          <span className="font-semibold"> Marca: </span>
          <Link
            href={`/product/filter?query=${product.attributes.brand.data?.attributes.name}`}
            className="underline text-gray-700 hover:text-gray-900"
          >
            {product.attributes.brand.data?.attributes.name}
          </Link>
        </div>
      ) : null}

      <ProductRating rating={product.attributes.rating} />

      {product.attributes.product_colors.data.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">Color:</span>
          {product.attributes.product_colors?.data.map((item) => (
            <div
              key={item.id}
              title={item.attributes.Name}
              className="border rounded-full shadow-sm"
            >
              <FaCircle
                className="h-5 w-5"
                style={{ color: `${item.attributes.code}` }}
              />
            </div>
          ))}
        </div>
      ) : null}

      {!product.attributes.prices.data[0].attributes.size?.data ? (
        <>
          {product.attributes.categories.data.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold">Categorías:</span>
              {product.attributes.categories.data.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/filter?query=${item.attributes.name}`}
                  className="underline text-gray-700 hover:text-gray-900"
                >
                  {item.attributes.name}
                </Link>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <h3 className="block font-semibold ">Tallas: </h3>
          <select
            id="sizeSelect"
            onChange={handleSizeChange}
            value={selectedSize.id}
            className="w-full border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring focus:border-indigo-500 sm:text-sm"
          >
            {product.attributes.prices.data.map((price) => (
              <option key={price.id} value={price.id}>
                {`${price.attributes.size.data?.attributes.numberLatam}-${price.attributes.size.data?.attributes.category.data.attributes.name}`}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* actions */}
      <div className="flex flex-col gap-2">
        <div>
          {getItemQuantity(product.id) ? (
            <div className="flex flex-row gap-2">
              <CartButtonAction
                onClick={() => cart.removeCartItem(product.id)}
                title={isPage ? "Eliminar" : undefined}
                icon={<MdDeleteOutline />}
              />
              <CartButtonAction
                onClick={() => cart.decreaseCartQuantity(product.id)}
                title={isPage ? "Quitar" : undefined}
                icon={<BsCartDash />}
              />
              <CartButtonAction
                onClick={() => cart.increaseCartQuantity(product.id)}
                title={`x ${getItemQuantity(product.id)}`}
                icon={<BsCartCheck />}
              />
            </div>
          ) : (
            <div className={`${isPage && "w-1/3"}  ml-auto`}>
              <CartButtonAction
                onClick={() => cart.increaseCartQuantity(product.id)}
                title="Añadir"
                icon={<BsCartPlus />}
              />
            </div>
          )}
        </div>
        <CartButtonAction
          onClick={() => {
            setProduct([product]), setIsOpen(true);
          }}
          title="Detalles"
          icon={<BsEye />}
          className={`${isPage ? "hidden" : "block"}`}
        />
      </div>
    </>
  );
}
