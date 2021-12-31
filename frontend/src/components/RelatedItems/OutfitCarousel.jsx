import React, {useState, useContext, useEffect} from 'react';
import { OutfitData1 } from './OutfitData.jsx';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';
import GlobalContext from '../../Contexts/index.jsx';
import axios from 'axios';
const stateHolder = []

const OutfitCarousel = ({ slides }) => {
  const [outfit, setOutfit] = useState(0);
  const [outfitData, setOutfitData] = useState([]);
  const {currentItem} = useContext(GlobalContext);



  const length = slides.length

  // var length = 0;
  // if (outfitData.length <= 0) {
  //   length = 1
  // } else {
  //   length = outfitData.length;
  // }

  const addToOutfit = (productID) => {
    axios.get(`api/products/${productID}`).then((res) => {
      stateHolder.push(res.data);
      setOutfitData(stateHolder);
    }).catch( (err) => {
      console.log('error in OutfitCarousel')
    })
  }

  useEffect(() => {
    addToOutfit(currentItem.id);
  }, [currentItem])

  const nextSlide = () => {
    setOutfit(outfit === length - 1 ? 0 : outfit + 1)
  };

  const prevSlide = () => {
    setOutfit(outfit === 0 ? length - 1 : outfit - 1)
  };

  return (
    <section className="outfitSlider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
      {OutfitData1.map((slide, index) => {
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