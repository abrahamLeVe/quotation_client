"use client";
import { ProductInterface } from "@/models/products.model";
import dynamic from "next/dynamic";

const ProductGallery = dynamic(
  () => import("@/components/product/ProductGallery"),
  {
    ssr: false,
  }
);
const ProductNotFound = dynamic(
  () => import("@/app/(ecommerce)/product/not-found"),
  {
    ssr: false,
  }
);
export default function ProductIndex({ data }: { data: ProductInterface[] }) {
  return (
    <>
      {data[0] ? (
        <ProductGallery id={data[0].id} attributes={data[0].attributes} />
      ) : (
        <div className="w-full min-h-screen">
          <ProductNotFound />
        </div>
      )}
    </>
  );
}
