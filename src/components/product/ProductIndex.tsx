"use client";
import { ProductInterface } from "@/models/products.model";
import dynamic from "next/dynamic";
import { ProductGallerySkeleton } from "../skeleton/product/ProductSkeleton";

const ProductGallery = dynamic(
  () => import("@/components/product/ProductPage"),
  {
    ssr: false,
    loading: () => <ProductGallerySkeleton />,
  }
);

export default function ProductIndex({ data }: { data: ProductInterface[] }) {
  return (
    <>
      <ProductGallery data={data} />
    </>
  );
}
