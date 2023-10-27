"use client";
import { ProductNAInterface } from "@/models/newArrivals.model";
import { ButtonAddToCart } from "./ProductButton";
import { TruncatedText } from "./ProductName";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: ProductNAInterface;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { discount, price, name, rating, thumbnail } = product.attributes;
  const url = thumbnail.data.attributes.url;

  return (
    <div className="flex flex-col border rounded-lg h-full relative bg-green-500">
      <div className="aspect-h-1 aspect-w-1">
        <img src={url} alt={name} className="rounded-t-lg" />
      </div>
      <div className="flex flex-col  text-sm rounded-b-lg p-3 bg-white h-full justify-start gap-3 ">
        <div className="flex flex-col gap-3">
          <TruncatedText text={name} maxLength={70} />

          <ProductRating rating={rating} />

          <ProductPrice discount={discount} price={price} />
        </div>
        <div>
          <ButtonAddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
