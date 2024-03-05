"use client";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SlideInterface } from "@/models/slide.model";
import React from "react";

interface CarouselPluginProps {
  data: SlideInterface;
}

export default function Slide({ data }: CarouselPluginProps) {
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
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {data.data.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-0 lg:p-6">
                    <img
                      src={slide.attributes.image.data?.attributes.url}
                      className="aspect-[16/6] w-full object-cover"
                      alt={slide.attributes.name}
                      loading="eager"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-0" />
        <CarouselNext className="-right-0" />
        <div className="py-2 text-center text-sm text-muted-foreground">
          Carrusel {current} de {count}
        </div>
      </Carousel>
    </>
  );
}
