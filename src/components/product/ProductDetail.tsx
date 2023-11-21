"use client";
import { useFilterContext } from "@/context/filter.context";
import { useProductContext } from "@/context/product.context";
import { useMounted } from "@/hooks/useMounted";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { capitalizeFirstLetter } from "@/utilities/utils";
import Link from "next/link";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { CartButton } from "./ProductCard";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import { DisclosureIndex } from "../ui/Disclosure";

export default function ProductDetail(data: ProductInterface) {
  const { getItemQuantity } = useProductContext();
  const cart = cartStore((state) => state);
  const { filterProductsByCategoryId, setResultText } = useFilterContext();

  const { attributes, id } = data;
  const mounted = useMounted();

  return (
    <div className="flex flex-col lg:w-[50%] gap-4">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg font-medium leading-6 text-gray-900">
          {attributes.name}
        </h1>
        <ProductRating rating={attributes.rating} />
        <div className="flex flex-row gap-5">
          <ProductPrice
            discount={attributes.discount}
            price={attributes.price}
          />
          {getItemQuantity(id) > 0 && mounted && <p>x{getItemQuantity(id)}</p>}
        </div>

        <ul>
          <li>
            <span className="font-semibold">Disponibilidad: </span>
            En stock
          </li>
          <li className="flex flex-wrap gap-2">
            <span className="font-semibold"> Categorías: </span>
            {attributes.categories.data.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => {
                    filterProductsByCategoryId(category.id);
                    setResultText(category.attributes.name);
                  }}
                  className="w-full relative hover:underline"
                >
                  <p className="font-medium text-gray-900 ">
                    {capitalizeFirstLetter(category.attributes.name)}
                  </p>
                  <Link href="/filter" className="absolute inset-0"></Link>
                </button>
              </div>
            ))}
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {mounted && (
          <>
            {getItemQuantity(id) > 0 && (
              <>
                <CartButton
                  onClick={() => cart.removeCartItem(id)}
                  title="Eliminar"
                  icon={<MdDeleteOutline />}
                />
                <CartButton
                  onClick={() => cart.decreaseCartQuantity(id)}
                  title="Quitar"
                  icon={<BsCartDash />}
                />
              </>
            )}
          </>
        )}
        <CartButton
          onClick={() => cart.increaseCartQuantity(id)}
          title="Añadir"
          icon={<BsCartPlus />}
        />
      </div>
      <div className="w-full border">
        <DisclosureIndex
          title={"Descripción"}
          child={
            <article className="prose prose-base max-w-none">
              <ReactMarkdown>
                {attributes.description}
              </ReactMarkdown>
            </article>
          }
        />
      </div>
    </div>
  );
}
