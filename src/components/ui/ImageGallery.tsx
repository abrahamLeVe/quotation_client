"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ProductInterface } from "@/models/products.model";

export default function ImageGalleryIndex(product: ProductInterface) {
  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    autoPlay: true,
  };
  return (
    <>
      <ImageGallery
        items={product.attributes.image.data?.map((item) => ({
          original: item.attributes.url,
          thumbnail: item.attributes.formats.thumbnail.url,
          slideToIndex: item.id,
        }))}
        {...imageGalleryOptions}
        thumbnailPosition="left"
      />
    </>
  );
}
