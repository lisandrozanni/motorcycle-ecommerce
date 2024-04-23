"use client"

import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"
import { HiOutlineMinus } from "react-icons/hi";

export default function Carousel({ slides }: { slides: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[635px] h-[307px] w-full px-4 mb-12 relative group">
      <div
        style={{ 
          backgroundImage: `url(${slides[currentIndex]})`,
          border: "1px solid #EDEDED",
          backgroundPosition: "center",
        }}
        className="w-full h-full rounded-lg bg-no-repeat duration-500"
      ></div>
      <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 cursor-pointer">
        <SlArrowLeft onClick={prevSlide} size={24} color="#903DF7" />
      </div>
      <div className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 cursor-pointer">
        <SlArrowRight onClick={nextSlide} size={24} color="#903DF7" />
      </div>
      <div className="flex top-4 justify-center">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <HiOutlineMinus
              size={30}
              color={slideIndex === currentIndex ? "#903DF7" : "#EDEDED"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
