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
    lazyLoad: true,
    loading: "lazy",
  };

  const images = product.attributes.image.data?.map((item) => ({
    original: item.attributes.url,
    originalAlt: item.attributes.name,
    originalHeight: item.attributes.height,
    originalWidth: item.attributes.width,
    lazyLoad: true,
  })) || [{ original: "/skeletonProduct.webp" }];

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
    lazyLoad: true,
    loading: "lazy",
    thumbnailLoading: "lazy",
  };

  const images = product.attributes.image.data?.map((item) => ({
    original: item.attributes.url,
    originalAlt: item.attributes.name,
    thumbnailAlt: item.attributes.name,
    thumbnail: item.attributes.formats.thumbnail.url,
    slideToIndex: item.id,
    originalHeight: item.attributes.height,
    originalWidth: item.attributes.width,
    lazyLoad: true,
  })) || [
    { original: "/skeletonProduct.webp", thumbnail: "/skeletonProduct.webp" },
  ];

  return (
    <ImageGallery
      items={images}
      {...imageGalleryOptions}
      thumbnailPosition="left"
    />
  );
}
