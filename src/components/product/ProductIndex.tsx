"use client";
import { ProductInterface } from "@/models/products.model";
import dynamic from "next/dynamic";
import ProductGallerySkeleton from "../skeleton/product/ProductGallerySkeleton";
const ProductGallery = dynamic(
  () => import("@/components/product/ProductGallery"),
  {
    ssr: false,
    loading: () => <ProductGallerySkeleton />,
  }
);

export default function ProductIndex({ data }: { data: ProductInterface[] }) {
  return (
    <>
      <ProductGallery id={data[0].id} attributes={data[0].attributes} />
    </>
  );
}
