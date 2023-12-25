"use client";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SlideInterface } from "@/models/slide.model";
import React from "react";

interface CarouselPluginProps {
  data: SlideInterface;
}

export default function Slide({ data }: CarouselPluginProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.data.map((slide, i) => (
          <CarouselItem key={slide.id}>
            <div className="p-1">
              <Card>
                <CardContent className="aspect-[16/6] p-0 lg:p-6">
                  <img
                    src={slide.attributes.image.data.attributes.url}
                    className="w-full h-full"
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
    </Carousel>
  );
}
