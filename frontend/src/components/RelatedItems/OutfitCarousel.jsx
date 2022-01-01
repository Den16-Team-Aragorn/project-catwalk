import React, { useState, useContext, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx'
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx'

const OutfitCarousel = () => {
  const [outfitSlide, setOutfitSlide] = useState(0);
  const {outfitData} = useContext(RelatedContext);
  const { currentItem } = useContext(GlobalContext);
  var length = 0;
  if (outfitData.length <= 0) {
    length = 1
  } else {
    length = outfitData.length;
  }

  const nextSlide = () => {
    if (length >= 2) {
      setOutfitSlide(outfitSlide === length - 1 ? 0 : outfitSlide + 1)
    }
  };

  const prevSlide = () => {
    if (length >= 2) {
      setOutfitSlide(outfitSlide === 0 ? length - 1 : outfitSlide - 1)
    }
  };

  return (
    <section className="outfitSlider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {outfitData.map((slide, index) => {
        return (
          <div className={index === outfitSlide ? 'outfitSlideActive' : 'outfitSlide'} key={index}
          >
          {index === outfitSlide && (<OutfitCard slide={slide}
          className="carouselImage"/>
           )}
        </div>
        )
      })}
    </section>
  );
};

export default OutfitCarousel;
