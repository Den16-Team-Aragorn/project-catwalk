import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';

const OverviewReview = () => {
  const {currentItem} = useContext(GlobalContext);

  return (
    <div className="overviewReviews">
      ★★★☆☆
      <a>   Read all reviews...</a>
    </div>
  );
};

export default OverviewReview;