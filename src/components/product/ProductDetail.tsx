"use client";
import { useProductContext } from "@/context/product.context";
import {
  ProductInterface,
  ProductPriceInterface,
} from "@/models/products.model";
import { cartStore } from "@/store/cart.store";
import { truncate } from "@/utilities/utils";
import Link from "next/link";
import { useState } from "react";
import { BsCartCheck, BsCartDash, BsCartPlus, BsEye } from "react-icons/bs";
import { FaCircle } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import SizeSelect from "../size/SizeSelect";
import { Button } from "../ui/button";
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

  const handleSizeChange = (id: string) => {
    const sizeId = parseInt(id);
    const selectedSize = product.attributes.prices.data.find(
      (price) => price.id === sizeId
    );
    setSize(selectedSize || product.attributes.prices.data[0]);
  };

  return (
    <>
      <h3 className=" text-gray-900 relative" title={product.attributes.name}>
        {!isPage ? (
          <>{truncate(product.attributes.name, 60)}</>
        ) : (
          <>{product.attributes.name}</>
        )}
      </h3>

      {selectedSize ? (
        <div className="flex gap-2">
          <ProductPrice
            discount={selectedSize.attributes.discount || 0}
            price={selectedSize.attributes.value || 0}
            popUp
          />
        </div>
      ) : null}

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
      {isPage ? (
        <>
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
            <SizeSelect
              selectedSize={selectedSize}
              productPrices={product.attributes.prices.data}
              handleSizeChange={handleSizeChange}
            />
          )}
        </>
      ) : null}

      {/* actions */}
      <div className="flex flex-col items-end gap-3 relative">
        {getItemQuantity(product.id) ? (
          <div className="flex flex-row gap-2">
            <Button
              onClick={() => cart.removeCartItem(product.id)}
              title="Quitar"
            >
              <MdDeleteOutline className="h-6 w-6" />
              {isPage ? "Quitar" : null}
            </Button>

            <Button
              onClick={() => cart.decreaseCartQuantity(product.id)}
              title="Restar"
            >
              <BsCartDash className="h-6 w-6" /> {isPage ? "Restar" : null}
            </Button>

            <Button
              onClick={() => cart.increaseCartQuantity(product.id)}
              title="Añadir"
            >
              <BsCartCheck className="h-6 w-6" />
              {`x ${getItemQuantity(product.id)}`}
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => cart.increaseCartQuantity(product.id)}
              title="Añadir"
            >
              <BsCartPlus className="h-6 w-6" /> Añadir
            </Button>
          </div>
        )}
        {isPage ? null : (
          <div>
            <Button
              onClick={() => {
                setProduct([product]), setIsOpen(true);
              }}
              title="Ver mas detalles"
            >
              <BsEye className="h-6 w-6" /> Ver detalles
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
