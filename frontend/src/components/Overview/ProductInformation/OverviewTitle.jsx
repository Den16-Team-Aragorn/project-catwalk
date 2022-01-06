import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';

const OverviewTitle = () => {
  const {currentItem} = useContext(GlobalContext);
  const {getAllStyles, allStyles, setAllStyles} = useContext(OverviewContext);
  const {salePrice, setSalePrice} = useContext(OverviewContext);

   useEffect(() => {

    getAllStyles();

  }, [currentItem]);


  return (
    <div className="overviewTitle">
      <p>{currentItem.category}</p>
      <h2>{currentItem.name}</h2>
      {
      salePrice === null ? <p>{`$${currentItem.default_price}`}</p> :
      <p><span style={{color: "maroon"}}>Sale Price: ${salePrice + "  "}</span>
      <span style={{"textDecoration": "line-through"}}>{"$" + currentItem.default_price}</span></p>
      }
    </div>
  );
};

// currentItem.default_price

export default OverviewTitle;