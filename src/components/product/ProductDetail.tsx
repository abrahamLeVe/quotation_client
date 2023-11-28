"use client";
import { useProductContext } from "@/context/product.context";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import Link from "next/link";
import { BsCartCheck, BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { CartButtonAction } from "../cart/CartButtonAction";
import { DisclosureIndex } from "../ui/Disclosure";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export default function ProductDetail(data: ProductInterface) {
  const { getItemQuantity } = useProductContext();
  const cart = cartStore((state) => state);
  const { attributes, id } = data;

  return (
    <div className="flex flex-col lg:w-[50%] gap-4">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          {attributes.name}
        </h1>
        <div className="flex gap-2">
          <ProductPrice
            discount={attributes.discount}
            price={attributes.price}
            popUp
          />
        </div>
        {attributes.brand?.data ? (
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold"> Marca: </span>
            <Link
              href={`/product/filter?query=${attributes.brand.data?.attributes.name}`}
              className="underline text-gray-700 hover:text-gray-900"
            >
              {attributes.brand.data?.attributes.name}
            </Link>
          </div>
        ) : (
          <></>
        )}
        <ProductRating rating={attributes.rating} />
        {attributes.categories.data.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Categorías:</span>
            {attributes.categories.data.map((item) => (
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
      <div className="flex flex-wrap justify-end gap-2">
        {getItemQuantity(id) ? (
          <>
            <CartButtonAction
              onClick={() => cart.removeCartItem(id)}
              title="Eliminar"
              icon={<MdDeleteOutline />}
            />
            <CartButtonAction
              onClick={() => cart.decreaseCartQuantity(id)}
              title="Quitar"
              icon={<BsCartDash />}
            />
            <CartButtonAction
              onClick={() => cart.increaseCartQuantity(id)}
              title={`x ${getItemQuantity(id)}`}
              icon={<BsCartCheck />}
            />
          </>
        ) : (
          <>
            <CartButtonAction
              onClick={() => cart.increaseCartQuantity(id)}
              title="Añadir"
              icon={<BsCartPlus />}
            />
          </>
        )}
      </div>

      <div className="w-full border">
        <DisclosureIndex
          title={"Descripción"}
          child={
            <article className="prose prose-base max-w-none">
              <ReactMarkdown>{attributes.description}</ReactMarkdown>
            </article>
          }
        />
      </div>
    </div>
  );
}
