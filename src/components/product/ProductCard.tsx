"use client";
import { ProductInterface } from "@/models/products.model";
import { ImageGalleryIndex } from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";

export default function ProductCard({
  product,
}: {
  product: ProductInterface;
}) {
  return (
    <>
      <div className="aspect-1 bg-gray-200 ">
        <ImageGalleryIndex product={product} />
      </div>
      <div className="flex flex-col h-full justify-between p-2 gap-2">
        {/* Details */}
        <ProductDetail product={product} />
      </div>
    </>
  );
}
