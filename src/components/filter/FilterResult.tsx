"use client";
import { useCartContext } from "@/context/cart.context";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { useProductContext } from "@/context/product.context";
import { cartStore } from "@/store/cart.store";
import FilterSection from "./FilterSection";
import Link from "next/link";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { CartButton } from "../product/ProductCard";
import ProductPrice from "../product/ProductPrice";
import ProductRating from "../product/ProductRating";
import FilterSelect from "./FilterSelect";
import FilterSliderOver from "./FilterSliderOver";
import { truncate } from "@/utilities/utils";

export default function FilterResult() {
  const cart = cartStore((state) => state);
  const { products, resultText } = useFilterContext();
  const { categories } = useCategoryContext();
  const { getItemQuantity } = useCartContext();
  const { getProduct } = useProductContext();

  return (
    <div className="flex w-full px-5">
      <div className="hidden lg:block">
        <FilterSection data={categories} />
      </div>
      <div className="w-full">
        <div className="sticky top-0 flex-wrap w-full p-5 z-10 backdrop-blur-lg">
          <div className="flex flex-wrap gap-3">
            <h2>RESULTADOS: </h2>
            <h3>{products.length === 0 ? "Sin resultados." : resultText}</h3>
          </div>
          <div className="flex flex-wrap w-full justify-end items-center gap-2">
            <FilterSliderOver data={categories} />
            <FilterSelect />
          </div>
        </div>
        <div>
          <ul className="flex-1 lg:p-5 -my-6 divide-y divide-gray-200">
            {products.map((product) => (
              <li className="flex py-6 relative gap-5" key={product.id}>
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                  <img
                    src={
                      product.attributes.thumbnail.data?.attributes.formats
                        .thumbnail.url
                    }
                    alt={product.attributes.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-col w-full gap-2">
                  <div className="font-medium text-gray-900">
                    <h3 title={product.attributes.name}>
                      {truncate(product.attributes.name, 110)}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row flex-wrap gap-5">
                        <ProductRating rating={product!.attributes.rating} />
                        <ProductPrice
                          discount={product.attributes.discount}
                          price={product.attributes.price}
                        />
                        {getItemQuantity(product.id) > 0 && (
                          <p>x{getItemQuantity(product.id)}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <span className="font-semibold">
                          Descripción completa:
                        </span>
                        <p className="hover:underline">
                          <Link href={`/product/${product!.attributes.slug}`}>
                            Click Aquí
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-end justify-end text-sm gap-3">
                      {getItemQuantity(product.id) > 0 && (
                        <div title="Restar">
                          <CartButton
                            onClick={() => {
                              cart.decreaseCartQuantity(product.id);
                            }}
                            icon={<BsCartDash />}
                            className="max-w-[42px]"
                          />
                        </div>
                      )}
                      <div title="Aumentar">
                        <CartButton
                          onClick={() => cart.increaseCartQuantity(product.id)}
                          icon={<BsCartPlus />}
                          className="max-w-[42px]"
                        />
                      </div>
                      <div title="Ver detalles">
                        <CartButton
                          onClick={() => {
                            getProduct(product.id);
                          }}
                          icon={<FaEye />}
                          className="max-w-[42px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
