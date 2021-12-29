import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import axios from 'axios';

const StyleCard = (props) => {
  const {currentItem} = useContext(GlobalContext);

  return (

      <img className='overviewImages' src={props.item.photos[0].url}/>

  );
};

export default StyleCard;