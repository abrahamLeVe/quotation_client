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
  const [selectedPrice, setPrice] = useState<ProductPriceInterface>(
    product.attributes.prices.data[0]
  );
  const [colors, setColors] = useState<ColorProduct[]>(
    selectedPrice.attributes.product_colors.data
  );

  const [idColor, setIdColor] = useState<number>(colors[0]?.id);

  const handleSizeChange = (id: string) => {
    const sizeId = parseInt(id);
    const priceSelected = product.attributes.prices.data.find(
      (price) => price.id === sizeId
    );
    setColors(priceSelected!.attributes.product_colors.data!);
    setIdColor(priceSelected!.attributes.product_colors.data[0].id);

    setPrice(priceSelected!);
  };

  const handleColorChange = (id: string) => {
    const colorId = parseInt(id);
    const selectedColor = colors.find((price) => price.id === colorId);
    setIdColor(selectedColor?.id!);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="relative" title={product.attributes.name}>
          {!isPage ? (
            <>{truncate(product.attributes.name, 60)}</>
          ) : (
            <>{product.attributes.name}</>
          )}
        </h3>

        {!selectedPrice ? null : (
          <div className="flex gap-2">
            <ProductPrice
              discount={selectedPrice.attributes.discount || 0}
              price={selectedPrice.attributes.value || 0}
              popUp
            />
          </div>
        )}

        {product.attributes.brand?.data ? (
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Marca: </span>
            <Link
              href={`/product/filter?query=${product.attributes.brand.data?.attributes.name}`}
              className="underline text-gray-700 hover:text-gray-900"
            >
              {product.attributes.brand.data?.attributes.name}
            </Link>
          </div>
        ) : null}

        <ProductRating rating={product.attributes.rating} />

        {colors.length > 0 ? (
          <ColorSelect
            colors={colors}
            handleColorChange={handleColorChange}
            productId={selectedPrice.id}
            key={selectedPrice.id}
          />
        ) : null}

        {isPage ? (
          <>
            {!product.attributes.prices.data[0].attributes.size?.data ? null : (
              <SizeSelect
                selectedPrice={selectedPrice}
                productPrices={product.attributes.prices.data}
                handleSizeChange={handleSizeChange}
              />
            )}
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
          </>
        ) : null}
      </div>

      {/* actions */}
      <div className="flex flex-col items-end gap-3 relative">
        <CartButtonActions id={selectedPrice.id} idColor={idColor} />
        {isPage ? null : <ProductModal product={product} />}
      </div>
    </>
  );
}
