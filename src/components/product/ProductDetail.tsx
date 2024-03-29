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
import ColorSelect from "../select/SelectColorProduct";
import SizeSelect from "../size/SizeSelect";
import ProductModal from "./ProductModal";
import ProductRating from "./ProductRating";
import { FaFilePdf } from "react-icons/fa6";
import ScrollToTop from "@/hooks/useScrollTop";

interface ProductDetailProps {
  product: ProductInterface;
  isPage?: boolean;
}

export default function ProductDetail({
  product,
  isPage = false,
}: ProductDetailProps) {
  const image = product.attributes.thumbnail.data.attributes.url;
  const [selectedPrice, setPrice] = useState<ProductPriceInterface>(
    product.attributes.prices.data[0]
  );

  const [colors, setColors] = useState<ColorProduct[]>(
    selectedPrice.attributes.product_colors.data
  );
  const [color, setColor] = useState<ColorProduct | undefined>(
    colors.length === 1
      ? selectedPrice.attributes.product_colors.data[0]
      : undefined
  );

  const [idColor, setIdColor] = useState<number | undefined>(
    colors.length === 1
      ? selectedPrice.attributes.product_colors.data[0]?.id
      : undefined
  );
  const [sizeName, SetSizeName] = useState<string | undefined>(
    selectedPrice.attributes.size.data
      ? selectedPrice.attributes.size.data?.attributes.name
      : undefined
  );

  const handleSizeChange = (id: string) => {
    const sizeId = parseInt(id);
    const priceSelected = product.attributes.prices.data.find(
      (price) => price.id === sizeId
    );
    SetSizeName(priceSelected!.attributes.size.data?.attributes.name);
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
    setColor(selectedColor);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="relative text-xl" title={product.attributes.name}>
          {!isPage ? (
            <>
              <ScrollToTop />
              {truncate(product.attributes.name, 50)}
            </>
          ) : (
            <>{product.attributes.name}</>
          )}
        </h3>

        <ProductRating rating={product.attributes.rating} />

        {product.attributes.brand?.data ? (
          <div className="flex flex-wrap gap-2">
            <span>Marca: </span>
            <Link
              href={`/filter/brand?query=${product.attributes.brand.data?.attributes.name}`}
              className="hover:opacity-95 underline "
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
              <div className="flex flex-wrap gap-2 relative">
                <span>Categorías:</span>
                {product.attributes.categories.data.map((category) => (
                  <Link
                    href={`/filter/category?query=${category.attributes.name}`}
                    className="hover:opacity-95 underline "
                    key={category.id}
                  >
                    {category.attributes.name}
                  </Link>
                ))}
              </div>
            ) : null}

            {product.attributes.documents.data.length > 0 ? (
              <ul className="list-disc">
                {product.attributes.documents.data.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span>{item.attributes.name}</span>
                    <FaFilePdf />
                    <a
                      href={item.attributes.file.data.attributes.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Descargar
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}

        <div className="flex flex-col items-end gap-3 relative">
          <CartButtonActions
            picture_url={image}
            priceId={selectedPrice.id}
            idColor={idColor!}
            colors={colors.length}
            color={color}
            isPage={isPage}
            size={sizeName}
            title={product.attributes.name}
            slug={product.attributes.slug}
          />
          {isPage ? null : <ProductModal product={product} />}
        </div>
      </div>
    </>
  );
}
