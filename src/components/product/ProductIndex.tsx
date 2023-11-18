"use client";
import { ProductsInterface } from "@/models/products.model";
import ReactImageGallery from "react-image-gallery";
import ProductDetail from "./ProductDetail";

export default function ProductIndex({ data }: ProductsInterface) {
  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    autoPlay: true,
  };
  return (
    <div className="flex flex-col lg:flex-row gap-5 p-6 relative">
      <div className="h-full lg:sticky top-0">
        <ReactImageGallery
          items={data[0].attributes.image.data.map((item) => ({
            original: item.attributes.url,
            thumbnail: item.attributes.formats.thumbnail.url,
            slideToIndex: item.id,
          }))}
          {...imageGalleryOptions}
          thumbnailPosition="left"
        />
      </div>
      <ProductDetail data={data} />
    </div>
  );
}
