"use client";
import { ProductInterface } from "@/models/products.model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ImageGalleryIndex({
  product,
}: {
  product: ProductInterface;
}) {
  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showNav: false,
    showFullscreenButton: false,
  };
  return (
    <>
      <ImageGallery
        items={product.attributes.image.data?.map((item) => ({
          original: item.attributes.url,
        }))}
        {...imageGalleryOptions}
      />
    </>
  );
}

export function ImageGalleryModal(product: ProductInterface) {
  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    autoPlay: true,
  };
  return (
    <ImageGallery
      items={product.attributes.image.data?.map((item) => ({
        original: item.attributes.url,
        thumbnail: item.attributes.formats.thumbnail.url,
        slideToIndex: item.id,
      }))}
      {...imageGalleryOptions}
      thumbnailPosition="left"
    />
  );
}
