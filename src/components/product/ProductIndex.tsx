"use client";
import { ProductInterface } from "@/models/products.model";
import ImageGalleryIndex from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";

export default function ProductIndex(data: ProductInterface) {
  const { attributes, id } = data;

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row gap-5 p-6 relative">
        <div className="h-full lg:w-[50%] lg:sticky top-4">
          <ImageGalleryIndex attributes={attributes} id={id} />
        </div>
        <ProductDetail attributes={attributes} id={id} />
      </div>      
    </>
  );
}
