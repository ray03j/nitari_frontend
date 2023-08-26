import React, { useState } from 'react';
import "./Slideshow.css"

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };


  return (
    <div className="slideshow">
      <button onClick={prevSlide}>&#60;</button>
      <img src={'/' + images[currentSlide]} alt={`Slide ${currentSlide}`} />
      <button onClick={nextSlide}>&#62;</button>
    </div>
  );
};

export default Slideshow;