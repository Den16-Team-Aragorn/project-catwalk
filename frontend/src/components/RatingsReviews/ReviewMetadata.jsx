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

  // metadata variables
  let oneStarPercentage = Math.floor((oneStarRatings/totalReviews)*100);
  let twoStarPercentage = Math.floor((twoStarRatings/totalReviews)*100);
  let threeStarPercentage = Math.floor((threeStarRatings/totalReviews)*100);
  let fourStarPercentage = Math.floor((fourStarRatings/totalReviews)*100);
  let fiveStarPercentage = Math.floor((fiveStarRatings/totalReviews)*100);

  // click event handler for star ratings
  const starRatingClickEventHandler = (event) => {
    let stars = event.target.innerText.slice(0,1);
    console.log(stars);
    // this will need to be completed, need to filter current reviews by star rating
    // also needs to work if multiple stars are selected
    // also should make visible a button beneath ratings to reset (turn off) all currently selected stars
  };


  // might need some sort of if-statement here to render properly in case no reviews exist
  return (
    <div className="reviewMetadata">

      <div className="reviewMetadataHeader">
        <div className="avgRating">{avgRating}</div>
        <div className="avgRatingStars">
          <Stars rating={avgRating} starRatedColor={"black"} numberOfStars={5} starDimension={"2vh"} starSpacing={"0vh"} />
        </div>
      </div>

      <div className="reviewMetaPercentRecommend">
        {percentRecommend}% of reviews recommend this product
      </div>

      <div className="reviewMetaRatingBreakdown">
        <div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>5 stars</div>
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${fiveStarPercentage}%`}}>{fiveStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - fiveStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
        <div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>4 stars</div>
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${fourStarPercentage}%`}}>{fourStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - fourStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
        <div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>3 stars</div>
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${threeStarPercentage}%`}}>{threeStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - threeStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
        <div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>2 stars</div>
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${twoStarPercentage}%`}}>{twoStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - twoStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
        <div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>1 stars</div>
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${oneStarPercentage}%`}}>{oneStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - oneStarPercentage}%`}}></div>
        </div>
      </div>

      <ReviewCharacteristics characteristics={characteristics} />

    </div>
  );

};

export default ReviewMetadata;
