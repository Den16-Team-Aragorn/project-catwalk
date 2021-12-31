import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewCharacteristics from './ReviewCharacteristics.jsx';
import axios from 'axios';
import Stars from 'react-star-ratings';


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


  // click event handler for star ratings
  const starRatingClickEventHandler = (event) => {
    let stars = event.target.id.slice(0,1);
    console.log(stars);
    // this will need to be completed, need to filter current reviews by star rating
    // also needs to work if multiple stars are selected
    // also should make visible a button beneath ratings to reset (turn off) all currently selected stars
  };




  return (
    <div className="reviewMetadata">

      <div className="reviewMetadataHeader">
        <div className="avgRating">{avgRating}</div>
        <div className="avgRatingStars">
          <Stars rating={avgRating} starRatedColor={"black"} numberOfStars={5} starDimension={"2vh"} starSpacing={"0vh"} />
        </div>

      </div>

      <div>
        {percentRecommend}% of reviews recommend this product
      </div>

      <div>
        <span id="5star" onClick={() => { starRatingClickEventHandler(event) }}>5 stars</span>
        <span> -- {fiveStarRatings}</span>

      </div>
      <div>
        <span id="4star" onClick={() => { starRatingClickEventHandler(event) }}>4 stars</span>
        <span> -- {fourStarRatings}</span>

      </div>
      <div>
        <span id="3star" onClick={() => { starRatingClickEventHandler(event) }}>3 stars</span>
        <span> -- {threeStarRatings}</span>

      </div>
      <div>
        <span id="2star" onClick={() => { starRatingClickEventHandler(event) }}>2 stars</span>
        <span> -- {twoStarRatings}</span>

      </div>
      <div>
        <span id="1star" onClick={() => { starRatingClickEventHandler(event) }}>1 stars</span>
        <span> -- {oneStarRatings}</span>

      </div>

      <ReviewCharacteristics characteristics={characteristics} />

    </div>
  );

};

export default ReviewMetadata;
