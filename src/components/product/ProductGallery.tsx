"use client";
import { ProductInterface } from "@/models/products.model";
import { ImageGalleryModal } from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";
import ProductNotFound from "./ProductNotFound";

export default function ProductGallery({
  data: product,
}: {
  data: ProductInterface[];
}) {
  return (
    <>
      {product[0] ? (
        <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
          <div className="h-full lg:w-[50%] lg:sticky top-6">
            <ImageGalleryModal
              attributes={product[0].attributes}
              id={product[0].id}
            />
          </div>
          <ProductDetail data={product[0]} />
        </div>
      ) : (
        <div className="w-full min-h-screen">
          <ProductNotFound />
        </div>
      )}
    </>
  );
}
