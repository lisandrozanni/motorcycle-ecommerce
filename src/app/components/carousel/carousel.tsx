'use client';

import { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { HiOutlineMinus } from 'react-icons/hi';

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
    <div className="group relative mb-12 h-[307px] w-full max-w-[635px] px-4">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex]})`,
          border: '1px solid #EDEDED',
          backgroundPosition: 'center',
        }}
        className="h-full w-full rounded-lg bg-no-repeat duration-500"
      ></div>
      <div className="absolute left-5 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl group-hover:block">
        <SlArrowLeft onClick={prevSlide} size={24} color="#903DF7" />
      </div>
      <div className="absolute right-5 top-[50%] -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full p-2 text-2xl group-hover:block">
        <SlArrowRight onClick={nextSlide} size={24} color="#903DF7" />
      </div>
      <div className="top-4 flex justify-center">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="cursor-pointer text-2xl">
            <HiOutlineMinus size={30} color={slideIndex === currentIndex ? '#903DF7' : '#EDEDED'} />
          </div>
        ))}
      </div>
    </div>
  );
}
