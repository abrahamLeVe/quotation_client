"use client";
import { ProductsInterface } from "@/models/products.model";
import ProductDetail from "./ProductDetail";
import ImageGalleryIndex from "../ui/ImageGallery";

export default function ProductIndex({ data }: ProductsInterface) {
  const { attributes, id } = data[0];

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-6 relative">
      <div className="h-full lg:sticky top-0">
        <ImageGalleryIndex attributes={attributes} id={id} />
      </div>
      <ProductDetail data={data} />
    </div>
  );
}
