import React, {useState, useContext} from 'react';
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
    characteristics,
    ratingFilter,
    setRatingFilter} = useContext(ReviewContext);


  // metadata variables
  let oneStarPercentage = Math.floor((oneStarRatings/totalReviews)*100);
  let twoStarPercentage = Math.floor((twoStarRatings/totalReviews)*100);
  let threeStarPercentage = Math.floor((threeStarRatings/totalReviews)*100);
  let fourStarPercentage = Math.floor((fourStarRatings/totalReviews)*100);
  let fiveStarPercentage = Math.floor((fiveStarRatings/totalReviews)*100);


  // create star rating filter elements
  let fiveStarLabel;
  if (ratingFilter[5]) {
    fiveStarLabel = (<div className="reviewMetaRatingLabelActive" onClick={() => { starRatingClickEventHandler(event) }}>5 stars</div>);
  } else {
    fiveStarLabel = (<div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>5 stars</div>);
  }

  let fourStarLabel;
  if (ratingFilter[4]) {
    fourStarLabel = (<div className="reviewMetaRatingLabelActive" onClick={() => { starRatingClickEventHandler(event) }}>4 stars</div>);
  } else {
    fourStarLabel = (<div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>4 stars</div>);
  }

  let threeStarLabel;
  if (ratingFilter[3]) {
    threeStarLabel = (<div className="reviewMetaRatingLabelActive" onClick={() => { starRatingClickEventHandler(event) }}>3 stars</div>);
  } else {
    threeStarLabel = (<div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>3 stars</div>);
  }

  let twoStarLabel;
  if (ratingFilter[2]) {
    twoStarLabel = (<div className="reviewMetaRatingLabelActive" onClick={() => { starRatingClickEventHandler(event) }}>2 stars</div>);
  } else {
    twoStarLabel = (<div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>2 stars</div>);
  }

  let oneStarLabel;
  if (ratingFilter[1]) {
    oneStarLabel = (<div className="reviewMetaRatingLabelActive" onClick={() => { starRatingClickEventHandler(event) }}>1 stars</div>);
  } else {
    oneStarLabel = (<div className="reviewMetaRatingLabel" onClick={() => { starRatingClickEventHandler(event) }}>1 stars</div>);
  }


  // click event handler for star ratings
  const starRatingClickEventHandler = (event) => {

    let rating = event.target.innerText.slice(0,1);
    let filter = {...ratingFilter};

    // turn off allVisible
    filter.allVisible = false;

    // toggle on/off the clicked rating
    filter[rating] = !filter[rating];

    // if all filters turned off, turn allVisible back on again
    if (!filter[1] && !filter[2] && !filter[3] && !filter[4] && !filter[5]) {
      filter.allVisible = true;
    }

    setRatingFilter(filter);
  };


  // render the star ratings (should prob refactor to use a .map function instead of hard coding)
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
        {fiveStarLabel}
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${fiveStarPercentage}%`}}>{fiveStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - fiveStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
      {fourStarLabel}
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${fourStarPercentage}%`}}>{fourStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - fourStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
      {threeStarLabel}
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${threeStarPercentage}%`}}>{threeStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - threeStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
      {twoStarLabel}
        <div className="reviewMetaRatingBar">
          <div className="reviewMetaRatingGreen" style={{width: `${twoStarPercentage}%`}}>{twoStarRatings}</div>
          <div className="reviewMetaRatingGrey"  style={{width: `${100 - twoStarPercentage}%`}}></div>
        </div>
      </div>

      <div className="reviewMetaRatingBreakdown">
      {oneStarLabel}
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
