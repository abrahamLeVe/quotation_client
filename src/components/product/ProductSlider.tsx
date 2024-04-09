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
import Autoplay from "embla-carousel-autoplay";

interface ProductSliderProps {
  data: ProductInterface[];
  isPage?: boolean;
}

export default function ProductSlider({
  data,
  isPage = true,
}: ProductSliderProps) {
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

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full aspect-[16/6]"
      >
        <CarouselContent className="-ml-1 ">
          {data.map((product) =>
            product.attributes.prices.data.length === 0 ? null : (
              <CarouselItem
                key={product.id}
                className={`relative ${
                  isPage
                    ? "pl-1 xs:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    : "pl-1 basis-1/2"
                }`}
              >
                <div className="p-1 h-full relative">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            )
          )}
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
