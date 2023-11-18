"use client";
import ProductCard from "../product/ProductCard";
import { ArrowButton } from "../slide/ArrowButton";
import Carousel from "react-simply-carousel";
import React, { useState } from "react";
import { ProductsInterface } from "@/models/product.model";

export default function Carrousel({ data: products }: ProductsInterface) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div>
      <Carousel
        containerProps={{
          style: {
            width: "100%",
            userSelect: "none",
            position: "relative",
          },
        }}
        preventScrollOnSwipe
        swipeTreshold={60}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: <ArrowButton direction="right" />,
        }}
        backwardBtnProps={{
          children: <ArrowButton direction="left" />,
        }}
        itemsToShow={5}
        speed={400}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
}
