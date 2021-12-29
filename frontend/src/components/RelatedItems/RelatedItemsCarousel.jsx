import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx'
import axios from 'axios';
import { RelatedImages } from './RelatedImages.jsx'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';

const RelatedItemsCarousel = ({ slides }) => {
  const [relatedData, setRelatedData] = useState([])
  const [otherItems, setOtherItems] = useState(0)
  const {currentItem} = useContext(GlobalContext);
  const {relatedItems} = useContext(RelatedContext);
  const {setRelatedItems} = useContext(RelatedContext);
  const length = slides.length

  const comboFetch = (productID) => {
    const relatedObjects = [];
    axios.get(`/api/products/${productID}/related`).then((res) => {
      var relatedArray = res.data;
      relatedArray.map((item, index) => {
        axios.get(`/api/products/${item}/styles`).then((res) => {
          relatedObjects.push(res.data);
        })
      })
    })
  }

  const fetchRelated = (productID) => {
    axios.get(`/api/products/${productID}/related`).then((res) => {
      setRelatedItems(res.data);
    })
  };

  const fetchRelatedstyles = (state) => {
    const dataArray = [];
    state.map((productID, index) => {
    axios.get(`/api/products/${productID}/styles`).then((res) => {
      dataArray.push(res.data);
    });
  });
    setRelatedData(dataArray);
    //console.log(relatedData)
  }

  useEffect(() => {
      fetchRelated(currentItem.id);
  }, [otherItems]);

  useEffect(() => {
    fetchRelatedstyles(relatedItems)
  }, [relatedItems])

  const nextSlide = () => {
    setOtherItems(otherItems === length - 1 ? 0 : otherItems + 1)
  };

  const prevSlide = () => {
    setOtherItems(otherItems === 0 ? length - 1 : otherItems - 1)
  };

  if(!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="relatedSlider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
      {RelatedImages.map((slide, index) => {
         return (
           <div className={index === otherItems ? 'relatedSlideActive' : 'relatedSlide'} key={index}>
             {index === otherItems && (<img src={slide.image} alt="loading image"
              className="carouselImage" />
              )}
           </div>
         )
      })}
    </section>

    // <div>related items carousel
    //   <div>items related to : {currentItem.name} </div>
    //   <div>
    //     {relatedItems.map((item, index) => {

    //       return (
    //           <RelatedCard key={index} item={item}/>
    //       )
    //     })}
    //   </div>

    // </div>
  );

};

export default RelatedItemsCarousel;
