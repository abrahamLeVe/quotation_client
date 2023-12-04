"use client";
import { ProductInterface } from "@/models/products.model";
import { ImageGalleryModal } from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";
import ProductNotFound from "./ProductNotFound";

interface ProductDetailsProps {
  data: ProductInterface[];
}

export default function ProductGallery({ data }: ProductDetailsProps) {
  return (
    <>
      {data[0] ? (
        <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
          <div className="h-full lg:w-[50%] lg:sticky top-6">
            <ImageGalleryModal
              attributes={data[0].attributes}
              id={data[0].id}
            />
          </div>
          <ProductDetail attributes={data[0].attributes} id={data[0].id} />
        </div>
      ) : (
        <div className="w-full min-h-screen">
          <ProductNotFound />
        </div>
      )}
    </>
  );
}
