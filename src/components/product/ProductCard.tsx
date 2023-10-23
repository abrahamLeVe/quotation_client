import { ProductNAInterface } from "@/models/newArrivals.model";
import { ButtonAddToCart } from "./ProductButton";
import { TruncatedText } from "./ProductName";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductCardProps {
  product: ProductNAInterface;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { attributes } = product;
  const hasDiscount = attributes.discount;
  const hasPrice = attributes.price;
  const name = attributes.name;
  const rating = attributes.rating;

  return (
    <div className="border rounded-lg relative">
      <div className="aspect-h-1 aspect-w-1">
        <img
          src={attributes.thumbnail.data.attributes.url}
          alt={attributes.name}
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col justify-around text-sm rounded-b-lg p-3 bg-white gap-3">
        <TruncatedText text={name} maxLength={80} />

        <ProductRating rating={rating} />

        <ProductPrice discount={hasDiscount} price={hasPrice} />

        <ButtonAddToCart product={product} />
      </div>
    </div>
  );
}
