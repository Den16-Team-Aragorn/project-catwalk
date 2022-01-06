import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx';
import axios from 'axios';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';
import RelatedCard from './RelatedCard.jsx';


const RelatedItemsCarousel = () => {
  const [shownSlide, setshownSlide] = useState(0);
  const { currentItem, setCurrentItem } = useContext(GlobalContext);
  const {
    relatedData,
    relatedReviews,
    relatedDataDetail,
    setRelatedData,
    outfitData } = useContext(RelatedContext);
  var holdArray = [];

  var length = 3;
  if (relatedData.length <= 1) {
    length = 3;
  } else {
    length = relatedData.length;
  }
  const relatedSetter = (slide) => {
    fetchItemData(slide.product_id);
  }

  const fetchItemData = (productID) => {
    if (productID === undefined) {
      return null
    } else {
      axios.get(`/api/products/${productID}`).then((res) => {
        setCurrentItem(res.data);
      }).catch((err) => {
        console.log('error in relatedItemsCarousel', err)
      })
    }
  };

  const nextSlide = () => {
    setshownSlide(shownSlide === length - 1 ? 0 : shownSlide + 1);
  };

  const prevSlide = () => {
    setshownSlide(shownSlide === 0 ? length - 1 : shownSlide - 1);
  };



  if (relatedData.length === 0) {
    return (
      <div>LOADING RELATED ITEMS</div>
    )
  } else {

    for (var i = 0; i < relatedData[0].length; i ++) {
      let combined = {
        ...relatedDataDetail[0][i],
        ...relatedData[0][i],
        ...relatedReviews[i]
      }
      holdArray.push(combined)
    };
  };


  let cards = holdArray.map((slide, index) => {
    return (
      <div key={index} onClick={() => relatedSetter(slide)} className={index === shownSlide ? 'relatedSlideActive' : 'relatedSlide'} >
          <RelatedCard slide={slide} className="carouselImage" />

        </div>
    )
  })

    return (
      <section className="relatedSlider" >
        {/* <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} /> */}
        <div className="RelatedContext" >
        {cards}
      </div>
      </section>

    );
};

export default RelatedItemsCarousel;