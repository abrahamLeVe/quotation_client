"use client";
import { ProductInterface } from "@/models/products.model";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
  data: ProductInterface[];
}

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import React from "react";

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
      console.log("current");
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-1">
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-1 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1 h-full">
                <Card className="h-full overflow-hidden">
                  <CardContent className="flex flex-col h-full p-0">
                    <ProductCard product={product} />
                  </CardContent>
                </Card>
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
