import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';
import axios from 'axios';

const StyleCard = (props) => {
  const {currentItem} = useContext(GlobalContext);
  const {allStyles} = useContext(OverviewContext);

  return (

      <img className='overviewImages' src={props.item.photos[0].url}/>

  );
};

export default StyleCard;