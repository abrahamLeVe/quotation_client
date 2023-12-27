"use client";
import { ProductInterface } from "@/models/products.model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export function ImageGalleryIndex({ product }: { product: ProductInterface }) {
  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showNav: false,
    showFullscreenButton: false,
  };

  const images = product.attributes.image.data?.map((item) => ({
    original: item.attributes.url,
  })) || [{ original: "/skeletonProduct.png" }];

  return (
    <>
      <ImageGallery items={images} {...imageGalleryOptions} />
    </>
  );
}

export default function ImageGalleryModal(product: ProductInterface) {
  const imageGalleryOptions = {
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    autoPlay: true,
  };

  const images = product.attributes.image.data?.map((item) => ({
    original: item.attributes.url,
    thumbnail: item.attributes.formats.thumbnail.url,
    slideToIndex: item.id,
  })) || [
    { original: "/skeletonProduct.png", thumbnail: "/skeletonProduct.png" },
  ];

  return (
    <ImageGallery
      items={images}
      {...imageGalleryOptions}
      thumbnailPosition="left"
    />
  );
}
