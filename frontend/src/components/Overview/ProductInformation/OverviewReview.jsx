import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';
import StarRatings from 'react-star-ratings';

const OverviewReview = () => {
  const {currentItem} = useContext(GlobalContext);
  const {avgRating} = useContext(OverviewContext);
  const {showReview, setShowReview} = useContext(OverviewContext);



  return (
    <div className="overviewReviews">
      <StarRatings className="overviewStars" rating={avgRating || 0} starDimension={"2vh"} starSpacing={"0vh"}/>
      <a href="#reviewParent">Read all reviews...</a>
    </div>
  );
};

export default OverviewReview;