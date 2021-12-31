import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx'
import axios from 'axios';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';



const RelatedItemsCarousel = () => {
  const [relatedData, setRelatedData] = useState([])
  const [otherItems, setOtherItems] = useState(0)
  const {currentItem} = useContext(GlobalContext);
  const {setCurrentItem} = useContext(GlobalContext);
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
    axios.get(`/api/products/${productID}`).then((res) => {
      setCurrentItem(res.data);
    }).catch( (err) => {
      console.log('error in relatedItemsCarousel')
    })

  };

  const comboFetch = (productID) => {
    const relatedObjects = [];
    axios.get(`/api/products/${productID}/related`).then((res) => {
      var relatedArray = res.data;
      relatedArray.map((item, index) => {
        axios.get(`/api/products/${item}/styles`).then((res) => {
          relatedObjects.push(res.data);
          setRelatedData(relatedObjects);
        }).catch( (err) => {
          console.log('error in relatedItemsCarousel')
        });
      });
    }).catch( (err) => {
      console.log('error in relatedItemsCarousel')
    });
  }

  useEffect(() => {
      comboFetch(currentItem.id);
  }, [currentItem]);

  const nextSlide = () => {
    setOtherItems(otherItems === length - 1 ? 0 : otherItems + 1)
  };

  const prevSlide = () => {
    setOtherItems(otherItems === 0 ? length - 1 : otherItems - 1)
  };

  if (relatedData[0] === undefined) {
    return (
      <div>LOADING</div>
    )
  } else {

  return (
    <section className="relatedSlider" >
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
      {relatedData.map((slide, index) => {
         return (
           <div className={index === otherItems ? 'relatedSlideActive' : 'relatedSlide'} key={index}  >
             {index === otherItems && (<img onClick={() => relatedSetter(slide)}  src={slide.results[0].photos[0].thumbnail_url} alt="loading image"
              className="carouselImage" />
              )}
           </div>
         )})}
    </section>
  );}
};

export default RelatedItemsCarousel;




//may need later



// const fetchRelated = (productID) => {
//   axios.get(`/api/products/${productID}/related`).then((res) => {
//     setRelatedItems(res.data);
//   })
// };

// const fetchRelatedstyles = (state) => {
//   const dataArray = [];
//   state.map((productID, index) => {
//   axios.get(`/api/products/${productID}/styles`).then((res) => {
//     dataArray.push(res.data);
//   });
// });
//   setRelatedData(dataArray);
// }