"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BrandsInterface } from "@/models/brand";
import React from "react";
import BrandCard from "./BrandCard";

interface BrandSliderProps {
  brands?: BrandsInterface;
}

export default function BrandSlider({ brands }: BrandSliderProps) {
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
    <div className="flex flex-col w-full px-4  justify-center relative">
      <h2 className="text-2xl font-bold tracking-tight pb-5">
        Las mejores marcas
      </h2>
      <Carousel setApi={setApi} className="w-full aspect-[16/5]">
        <CarouselContent className="-ml-1 ">
          {brands?.data.map((brand) => (
            <CarouselItem
              key={brand.id}
              className={`relative pl-1 xs:basis-1/2 md:basis-1/3 lg:basis-1/4`}
            >
              <div className="p-1 h-full">
                <BrandCard brand={brand} />
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
    </div>
  );
}
