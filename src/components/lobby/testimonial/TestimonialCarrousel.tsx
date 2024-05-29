"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ContactsDataInterface } from "@/models/contact.model";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import TestimonialCard from "./TestimonialCard";

interface TestimonialCarrouselProps {
  contacts: ContactsDataInterface;
}
export function TestimonialCarrousel({ contacts }: TestimonialCarrouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel plugins={[plugin.current]} className="w-full py-14 h-full">
      <CarouselContent>
        {contacts?.data.map((contact) => (
          <CarouselItem
            key={contact.id}
            className={`xs:basis-1/2 md:basis-1/3 lg:basis-1/4`}
          >
            <div className="p-1 h-full">
              <TestimonialCard contact={contact} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
