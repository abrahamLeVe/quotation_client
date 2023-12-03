"use client";
import { SlideInterface } from "@/models/slide.model";
import { useEffect, useState } from "react";
import { TiMinus } from "react-icons/ti";
import { ArrowButton } from "./ArrowButton";

export default function Slide({ data }: SlideInterface) {
  const slides = data?.map((item) => ({
    url: item.attributes.image.data?.attributes.url,
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
    <section className="w-full max-h-screen relative z-30">
      <div className="aspect-[16/5]">
        {slides.map((slide, slideIndex) => (
          <img
            key={slide.key}
            src={slide.url}
            className={`w-full h-full slide ${
              slideIndex === currentIndex ? "opacity-100" : "opacity-0"
            } transition-opacity duration-700 ease-in-out absolute inset-0 rounded-xl`}
            alt={slide.alt}
          />
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
              className={`h-8 w-8 ${
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
