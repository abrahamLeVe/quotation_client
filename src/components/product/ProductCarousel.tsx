"use client";
import { NewArrivalInterface } from "@/models/newArrivals.model";
import productStorage from "@/store/product.store";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

export default function ProductCarousel(data: NewArrivalInterface) {
  const addProductToStore = productStorage((state) => state.addProduct);
  useEffect(() => {
    addProductToStore(data);
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="flex flex-col h-full px-4 py-5 sm:px-6 lg:px-8 justify-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 pb-5">
        New Arrivals
      </h2>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
        draggable={false}
        autoPlay={false}
        infinite
        className="z-30 py-3  h-full"
      >
        {data.data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Carousel>
    </div>
  );
}
