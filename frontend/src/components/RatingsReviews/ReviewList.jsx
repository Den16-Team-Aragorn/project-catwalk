import React, {useContext} from 'react';
import ReviewTile from './ReviewTile.jsx';
import ReviewContext from '../../Contexts/reviewContext.jsx';


const ReviewList = () => {

  const {visibleReviewsCounter, visibleReviews} = useContext(ReviewContext);




  return (
    <div className="reviewList">

      {visibleReviews.map( review => (
        <ReviewTile review={review} key={review.review_id} />
      ))}

    </div>
  );
};

export default ReviewList;
