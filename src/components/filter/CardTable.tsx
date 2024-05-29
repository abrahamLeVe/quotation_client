"use client";
import { ProductInterface } from "@/models/products.model";
import ProductCard from "../product/ProductCard";

export default function CardTable({
  currentProducts,
}: {
  currentProducts?: ProductInterface[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {currentProducts!.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-between relative text-sm"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
