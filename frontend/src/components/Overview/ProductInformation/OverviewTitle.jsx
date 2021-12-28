import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';

const OverviewTitle = () => {
  const {currentItem} = useContext(GlobalContext);
  return (
    <div className="overviewTitle">
      <p>{currentItem.category}</p>
      <h2>{currentItem.name}</h2>
      <p>{`$${currentItem.default_price}`}</p>
    </div>
  );
};

export default OverviewTitle;