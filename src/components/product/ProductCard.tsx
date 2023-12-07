"use client";
import { useProductContext } from "@/context/product.context";
import { ProductInterface } from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import Link from "next/link";
import { BsCartCheck, BsCartPlus, BsEye } from "react-icons/bs";
import { FaCircle } from "react-icons/fa6";
import { CartButtonAction } from "../cart/CartButtonAction";
import ImageGalleryIndex from "../ui/ImageGallery";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  const cart = cartStore((state) => state);
  const { getItemQuantity, setProduct, setIsOpen } = useProductContext();
  return (
    <>
      <div className="flex flex-col">
        <div className="aspect-1 bg-gray-200 ">
          <ImageGalleryIndex product={product} />
        </div>

        <div className="flex flex-col p-2 gap-2">
          <h3
            className=" text-gray-900 hover:text-black hover:underline relative"
            title={product.attributes.name}
          >
            {truncate(product.attributes.name, 60)}
            <Link
              href={`/product/${product.attributes.slug}`}
              className="absolute inset-0"
            ></Link>
          </h3>
          <div className="flex gap-2">
            <ProductPrice
              discount={product.attributes.prices.data[0]?.attributes.discount}
              price={product.attributes.prices.data[0]?.attributes.value}
              popUp
            />
          </div>

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
        </div>
      </div>
      <div className="flex flex-wrap justify-end p-3 gap-2">
        <CartButtonAction
          onClick={() => {
            setProduct([product]), setIsOpen(true);
          }}
          title="Detalles"
          icon={<BsEye />}
        />
        {getItemQuantity(product.id) ? (
          <>
            <CartButtonAction
              onClick={() => cart.increaseCartQuantity(product.id)}
              title={`x ${getItemQuantity(product.id)}`}
              icon={<BsCartCheck />}
            />
          </>
        ) : (
          <>
            <CartButtonAction
              onClick={() => cart.increaseCartQuantity(product.id)}
              title="Añadir"
              icon={<BsCartPlus />}
            />
          </>
        )}
      </div>
    </>
  );
}
