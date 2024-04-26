"use client";
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
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

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
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data?.data.map((slide) => (
          <CarouselItem key={slide.id}>
            <Card>
              <CardContent className="p-0 lg:p-6 relative aspect-[16/6]">
                {slide.attributes.image.data?.attributes.mime.startsWith(
                  "video/"
                ) ? (
                  <video
                    src={slide.attributes.image.data?.attributes.url}
                    className="w-full h-full object-cover"
                    controls
                    aria-label={slide.attributes.name}
                  />
                ) : (
                  <img
                    src={slide.attributes.image.data?.attributes.url}
                    className="w-full h-full aspect-[16/6] object-cover"
                    alt={slide.attributes.name}
                    loading="eager"
                  />
                )}
                <Button
                  className="absolute left-1/2 bottom-8 max-w-48 w-full -ml-24"
                  variant={"default"}
                >
                  Ver productos
                  <Link
                    href={`/filter/category?query=${slide.attributes.category.data.attributes.name}`}
                    className="absolute inset-0"
                  />
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-0" />
      <CarouselNext className="-right-0" />
      <div className="py-2 text-center text-sm text-muted-foreground">
        Carrusel {current} de {count}
      </div>
    </Carousel>
  );
}
