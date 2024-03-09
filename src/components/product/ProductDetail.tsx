"use client";
import {
  ColorProduct,
  ProductInterface,
  ProductPriceInterface,
} from "@/models/products.model";
import { truncate } from "@/utilities/utils";
import Link from "next/link";
import { useState } from "react";
import CartButtonActions from "../cart/CartButtonActions";
import ColorSelect from "../color/ColorSelect";
import SizeSelect from "../size/SizeSelect";
import ProductModal from "./ProductModal";
import ProductRating from "./ProductRating";

interface ProductDetailProps {
  product: ProductInterface;
  isPage?: boolean;
}

export default function ProductDetail({
  product,
  isPage = false,
}: ProductDetailProps) {
  const [selectedPrice, setPrice] = useState<ProductPriceInterface>(
    product.attributes.prices.data[0]
  );

  const [colors, setColors] = useState<ColorProduct[]>(
    selectedPrice.attributes.product_colors.data
  );

  const [idColor, setIdColor] = useState<number | undefined>(
    colors.length === 1
      ? selectedPrice.attributes.product_colors.data[0]?.id
      : undefined
  );

  const handleSizeChange = (id: string) => {
    const sizeId = parseInt(id);
    const priceSelected = product.attributes.prices.data.find(
      (price) => price.id === sizeId
    );
    setColors(priceSelected!.attributes.product_colors.data!);

    if (priceSelected!.attributes.product_colors.data.length > 1) {
      setIdColor(undefined);
    } else {
      setIdColor(priceSelected!.attributes.product_colors.data[0].id);
    }

    setPrice(priceSelected!);
  };

  const handleColorChange = (id: string) => {
    const colorId = parseInt(id);
    const selectedColor = colors.find((price) => price.id === colorId);
    setIdColor(selectedColor?.id!);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <h3 className="relative text-xl" title={product.attributes.name}>
          {!isPage ? (
            <>{truncate(product.attributes.name, 40)}</>
          ) : (
            <>{product.attributes.name}</>
          )}
        </h3>

        <ProductRating rating={product.attributes.rating} />

        {product.attributes.brand?.data ? (
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Marca: </span>
            <Link
              href={`/filter/brand?query=${product.attributes.brand.data?.attributes.name}`}
              className="hover:opacity-95 hover:underline "
            >
              {product.attributes.brand.data?.attributes.name}
            </Link>
          </div>
        ) : null}

        {!product.attributes.prices.data[0].attributes.size?.data ? null : (
          <SizeSelect
            selectedPrice={selectedPrice}
            productPrices={product.attributes.prices.data}
            handleSizeChange={handleSizeChange}
          />
        )}

        {colors.length > 0 ? (
          <ColorSelect
            colors={colors}
            handleColorChange={handleColorChange}
            priceId={selectedPrice.id}
            key={selectedPrice.id}
          />
        ) : null}

        {isPage ? (
          <>
            {product.attributes.categories.data.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                <span className="font-semibold">Categorías:</span>
                {product.attributes.categories.data.map((item) => (
                  <Link
                    key={item.id}
                    href={`/filter/category?query=${item.attributes.name}`}
                    className="hover:opacity-95 hover:underline"
                  >
                    {item.attributes.name}
                  </Link>
                ))}
              </div>
            ) : null}

            {product.attributes.documents.data.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.attributes.documents.data.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span>{item.attributes.file.data.attributes.name}</span>
                    <a
                      href={item.attributes.file.data.attributes.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Descargar
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        ) : null}

        <div className="flex flex-col items-end gap-3 relative">
          <CartButtonActions
            priceId={selectedPrice.id}
            idColor={idColor!}
            colors={colors}
            isPage={isPage}
          />
          {isPage ? null : <ProductModal product={product} />}
        </div>
      </div>
    </>
  );
}
