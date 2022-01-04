import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';

const OverviewTitle = () => {
  const {currentItem} = useContext(GlobalContext);
  const {getAllStyles, allStyles, setAllStyles} = useContext(OverviewContext);
  const [price, setPrice] = useState(currentItem.default_price);

   useEffect(() => {

    getAllStyles();

  }, [currentItem]);



  return (
    <div className="overviewTitle">
      <p>{currentItem.category}</p>
      <h2>{currentItem.name}</h2>
      <p>{`$${currentItem.default_price}`}</p>
    </div>
  );
};

// currentItem.default_price

export default OverviewTitle;