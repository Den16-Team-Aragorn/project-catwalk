import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import axios from 'axios';

const StyleCard = (props) => {
  const {currentItem} = useContext(GlobalContext);
  let url = props.item.photos[0].thumbnail_url || 'not working';
  return (
    <div>
      <img className='overviewImages' src={url} />
    </div>
  );
};

export default StyleCard;