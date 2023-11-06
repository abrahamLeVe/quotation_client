"use client";
import { SliderInterface } from "@/models/slider.model";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TiMinus } from "react-icons/ti";
import { ArrowButton } from "./ArrowButton";

export default function Slider({ data }: SliderInterface) {
  const slides = data.map((item) => ({
    url: item.attributes.image.data.attributes.url,
    alt: item.attributes.name,
    key: item.id,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(autoSlideInterval);
    };
  });

  return (
    <section className="w-full relative z-30">
      <div className="aspect-[16/6]">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.key}
            className={`slide ${
              slideIndex === currentIndex ? "opacity-100" : "opacity-0"
            } transition-opacity duration-700 ease-in-out absolute inset-0`}
          >
            <Image
              src={slide.url}
              className="h-full w-full md:rounded-2xl"
              alt={slide.alt}
              width={1440}
              height={580}
              priority
            />
          </div>
        ))}
      </div>
      <ArrowButton onClick={prevSlide} direction="left" />
      <ArrowButton onClick={nextSlide} direction="right" />
      <div className="flex top-4 justify-center py-2">
        {slides.map((_slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="cursor-pointer z-40"
          >
            <TiMinus
              className={`h-6 w-6  ${
                slideIndex === currentIndex ? "text-indigo-600" : ""
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
