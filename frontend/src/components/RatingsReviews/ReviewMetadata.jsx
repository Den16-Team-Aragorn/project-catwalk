import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewCharacteristics from './ReviewCharacteristics.jsx';
import axios from 'axios';


const ReviewMetadata = () => {

  // get state data from ReviewContext
  const {
    productId,
    avgRating,
    percentRecommend,
    oneStarRatings,
    twoStarRatings,
    threeStarRatings,
    fourStarRatings,
    fiveStarRatings,
    totalReviews,
    characteristics} = useContext(ReviewContext);




  return (
    <div className="reviewMetadata">

      <div>
        <span className="avgRating">{avgRating}</span>
        <span className="avgRatingStars">****</span>
      </div>

      <div>
        {percentRecommend}% of reviews recommend this product
      </div>

      <div>
        5 stars -- {fiveStarRatings}
      </div>
      <div>
        4 stars -- {fourStarRatings}
      </div>
      <div>
        3 stars -- {threeStarRatings}
      </div>
      <div>
        2 stars -- {twoStarRatings}
      </div>
      <div>
        1 stars -- {oneStarRatings}
      </div>

      <ReviewCharacteristics characteristics={characteristics} />

    </div>
  );

};

export default ReviewMetadata;
