import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';


const ReviewListButtons = () => {

  // import state
  const {totalReviews, visibleReviewsCounter, setVisibleReviewsCounter} = useContext(ReviewContext);

  // click event handler for more reviews button
  const moreReviewsClickHandler = () => {
    if (visibleReviewsCounter < totalReviews) {
      setVisibleReviewsCounter(visibleReviewsCounter + 2);
    }
  };


  // render add review button, and more reviews button if there are more to display
  if (visibleReviewsCounter < totalReviews) {
    return (
      <div className="ReviewListButtons">
        <button onClick={ () => { moreReviewsClickHandler() }}>MORE REVIEWS</button>
        <button>ADD A REVIEW +</button>
      </div>
    )
  } else {
    return (
      <div className="ReviewListButtons">
        <button>ADD A REVIEW +</button>
      </div>
    );
  }

};

export default ReviewListButtons;