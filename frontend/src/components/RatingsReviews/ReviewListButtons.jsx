import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';


const ReviewListButtons = () => {

  // import state total reviews, currentlyVisible
  // if no reviews or if all reviews currently displayed, then more reviews button not rendered
  // add review always visible

  const {totalReviews, visibleReviewsCounter, setVisibleReviewsCounter} = useContext(ReviewContext);

  // click event handler for more reviews button
  const moreReviewsClickHandler = () => {
    setVisibleReviewsCounter(visibleReviewsCounter + 2);
  };





  return (
    <div className="ReviewListButtons">
      <button onClick={ () => { moreReviewsClickHandler() }}>MORE REVIEWS</button>
      <button>ADD A REVIEW +</button>

    </div>
  );
};

export default ReviewListButtons;