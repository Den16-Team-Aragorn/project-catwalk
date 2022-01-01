/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useContext, useState, useEffect} from 'react';
import GlobalContext from '../../../Contexts/index.jsx'
import axios from 'axios';

const ImageCarousel = () => {
  const { currentItem } = useContext(GlobalContext);
  const [styles, setStyles] = useState(null);


  useEffect(() => {
    if(currentItem.id !== undefined) {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {
      setStyles(res.data.results);
    }).catch((err) => {
      console.log('error in imagecarousel');
    })
  }
  }, [currentItem]);


  if(styles == null) {
    return (<div>'Loading Carousel...'</div>)
  }

  return (

      <img className="image-carousel" src={styles[0].photos[0].url}/>

  );
};

export default ImageCarousel;
