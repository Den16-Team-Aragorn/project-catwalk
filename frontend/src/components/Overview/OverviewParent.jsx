/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import {useState, useContext, useEffect} from 'react';
import ProductInformationParent from './ProductInformation/ProductInformationParent.jsx';
import ProductDescriptionParent from './ProductDescription/ProductDescriptionParent.jsx';
import OverviewContext from '../../Contexts/OverviewContext.jsx';
import GlobalContext from '../../Contexts/index.jsx';
import axios from 'axios';

const OverviewParent = () => {

  const [styles, setStyles] = useState([]);
  const [allStyles, setAllStyles] = useState([]);
  const { currentItem, setCurrentItem } = useContext(GlobalContext);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [showReview, setShowReview] = useState(true);
  const [current, setCurrent] = useState(0);
  const [salePrice, setSalePrice] = useState(null);

  const setStyle = () => {
    if(currentItem.id !== undefined) {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {
      let temp = res.data.results[0].photos;
      let arr = [];
      temp.forEach((element) => {
        arr.push(element.url);
      })
      setStyles(arr);

    }).catch((err) => {
      console.log('error in imagegallery');
    })}
  }

  const getAllStyles = () => {
    if(currentItem.id !== undefined) {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {

      setAllStyles(res.data);
    }).catch((err) => {
      console.log('error in getAllStyles');
    })}
  }

  const fetchReviewMetadataAndReviews = () => {
    if(currentItem.id !== undefined) {
    axios
      .get(`/api/reviews/meta?product_id=${currentItem.id}`)
      .then( ({data}) => {

        let oneStar = Number(data.ratings[1]) || 0;
        let twoStar = Number(data.ratings[2]) || 0;
        let threeStar = Number(data.ratings[3]) || 0;
        let fourStar = Number(data.ratings[4]) || 0;
        let fiveStar = Number(data.ratings[5]) || 0;
        let totalStars = oneStar + twoStar*2 + threeStar*3 + fourStar*4 + fiveStar*5;
        let totalRev = oneStar + twoStar + threeStar + fourStar + fiveStar;
        setTotalReviews(totalRev);

        if (totalRev === 0) {
          setAvgRating(0);
        } else {
          setAvgRating( Number((totalStars / totalRev).toFixed(1)) );
        }

      }).catch( (err) => {
        console.log('error occurred in OverviewfetchReviewMetadata..');
      });}
  };

  useEffect( () => {
    fetchReviewMetadataAndReviews();
    getAllStyles();
  }, [currentItem]);


  return (
    <div>
      <OverviewContext.Provider value={ {styles, setStyles, allStyles, setAllStyles,
         getAllStyles, setStyle, avgRating, showReview, setShowReview, current, setCurrent,
         salePrice, setSalePrice} }>
      <div className="overviewParent">
          <ImageGallery />
          <ProductInformationParent />
          <ProductDescriptionParent />
      </div>
      </OverviewContext.Provider>
    </div>
  );

};

export default OverviewParent;
