import React, {useContext} from 'react';
import ReviewSort from './ReviewSort.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewListButtons from './ReviewListButtons.jsx';
import ReviewContext from '../../Contexts/reviewContext.jsx';


const ReviewListContainer = () => {

  const {totalReviews} = useContext(ReviewContext);

  // if no reviews exist, ReviewSort and ReviewList should not render. Add review button still should though.
  if (totalReviews === 0) {
    return (
      <div className="reviewListContainer">
        No reviews to display
        <ReviewListButtons />
      </div>);

  } else {

    return (
      <div className="reviewListContainer">
        <ReviewSort />
        <ReviewList />
        <ReviewListButtons />
      </div>
    );
  }

};

export default ReviewListContainer;
