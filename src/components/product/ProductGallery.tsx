"use client";
import { ProductInterface } from "@/models/products.model";
import {ImageGalleryModal} from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";

export default function ProductGallery(productDetails: ProductInterface) {
  return (
    <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
      <div className="h-full lg:w-[50%] lg:sticky top-6">
        <ImageGalleryModal
          attributes={productDetails.attributes}
          id={productDetails.id}
        />
      </div>
      <ProductDetail
        attributes={productDetails.attributes}
        id={productDetails.id}
      />
    </div>
  );
}
