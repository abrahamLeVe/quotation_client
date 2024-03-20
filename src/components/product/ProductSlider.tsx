"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductInterface } from "@/models/products.model";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  data: ProductInterface[];
}

export default function ProductSlider({ data }: ProductSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-full aspect-[16/6]">
        <CarouselContent className="-ml-1 ">
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-1 xs:basis-1/2 md:basis-1/3 lg:basis-1/4 relative"
            >
              <div className="p-1 h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Carrusel {current} de {count}
      </div>
    </>
  );
}
