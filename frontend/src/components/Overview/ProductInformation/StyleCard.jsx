import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';
import axios from 'axios';

const StyleCard = (props) => {
  const {currentItem} = useContext(GlobalContext);
  const {allStyles, styles, setStyles} = useContext(OverviewContext);
  const {currentPhoto, setCurrentPhoto} = useContext(OverviewContext);
  const {salePrice, setSalePrice} = useContext(OverviewContext);




  const handleClick = (e) => {
    let photoArrayOfObjs = props.item.photos;
    let tempArray = [];
    photoArrayOfObjs.forEach((element) => {
      tempArray.push(element.url);
    })
    setStyles(tempArray);

    props.onClick(e);
    setSalePrice(props.salePrice);


  }





  return (

      <img className={'overviewImages'} onClick={handleClick} src={props.item.photos[0].thumbnail_url}/>

  );
};

export default StyleCard;