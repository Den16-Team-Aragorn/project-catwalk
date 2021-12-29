import React, {useState} from 'react';
import { OutfitData } from './OutfitData.jsx';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';

const OutfitCarousel = ({ slides }) => {
  const [outfit, setOutfit] = useState(0);
  const length = slides.length

  const nextSlide = () => {
    setOutfit(outfit === length - 1 ? 0 : outfit + 1)
  };

  const prevSlide = () => {
    setOutfit(outfit === 0 ? length - 1 : outfit - 1)
  };

  if(!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="outfitSlider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
      {OutfitData.map((slide, index) => {
         return (
           <div className={index === outfit ? 'outfitSlideActive' : 'outfitSlide'} key={index}>
             {index === outfit && (<img src={slide.image} alt="loading image"
              className="carouselImage" />
              )}

           </div>
         )
      })}
    </section>
  );
};

export default OutfitCarousel;