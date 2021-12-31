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

  const setStyle = () => {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {
      let temp = res.data.results[0].photos;
      let arr = [];
      temp.forEach((element) => {
        arr.push(element.url);
      })
      setStyles(arr);

    }).catch((err) => {
      console.log('error in imagegallery');
    })
  }

  const getAllStyles = () => {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {
      setAllStyles(res.data);
    }).catch((err) => {
      console.log('error in getAllStyles');
    })
  }


  return (
    <div>
      <OverviewContext.Provider value={ {styles, setStyles, allStyles, setAllStyles, getAllStyles, setStyle} }>
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
