"use client";
import { MinusSmallIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { ArrowButton } from "./ArrowButton";

export default function Slider({ data }: SliderInterface) {
  const slides = data.map((item) => ({
    url: item.attributes.image.data.attributes.formats.large.url,
    alt: item.attributes.name,
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
  }, [currentIndex]);

  return (
    <div className="max-w-[1440px] h-[400px]  md:h-[90vh] w-full m-auto pb-12 md:px-4 relative group z-30">
      <img
        src={slides[currentIndex].url}
        className="w-full h-full rounded-2xl object-cover object-center"
        alt={slides[currentIndex].alt}
        loading="eager"
      />
      <ArrowButton onClick={prevSlide} direction="left" />
      <ArrowButton onClick={nextSlide} direction="right" />
      <div className="flex top-4 justify-center py-2">
        {slides.map((_slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="cursor-pointer"
          >
            <MinusSmallIcon
              className={`h-6 w-6  ${
                slideIndex === currentIndex ? "text-indigo-600" : ""
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
