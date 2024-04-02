import React, { useState, useEffect } from 'react';
import Slide from './Slide';
import image1 from "../../assets/bg1.jpg";
import image2 from "../../assets/bg2.jpeg";
import image3 from "../../assets/bg3.jpg";
import { Icon } from '@iconify/react';

const slides = [
  {
    image: image1,
    text: 'Slide 1',
  },
  {
    image: image2,
    text: 'Slide 2',
  },
  {
    image: image3,
    text: 'Slide 3',
  },
];

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative">
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-xl text-Teal px-4 py-2 rounded-full" onClick={goToPrevSlide}>
      <Icon icon="line-md:chevron-small-left" />
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-xl text-Teal px-4 py-2 rounded-full" onClick={goToNextSlide}>
      <Icon icon="line-md:chevron-small-right" />
      </button>
      <Slide image={slides[currentSlide].image} text={slides[currentSlide].text} />
    </div>
  );
};

export default SlideShow;
