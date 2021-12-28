import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewTile from './ReviewTile.jsx';


const ReviewList = () => {

  const {totalReviews} = useContext(ReviewContext);





  return (
    <div className="reviewList">
      {totalReviews} reviews, sorted by __relevance__

      <ReviewTile />
    </div>


  );
};

export default ReviewList;
