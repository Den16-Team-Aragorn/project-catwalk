import React from 'react';
import {DateTime} from 'luxon';
import Stars from 'react-star-ratings';


const ReviewTile = (props) => {

  // create element that will render if reviewer recommended the product
  let recommend;
  if (props.review.recommend) {
    recommend = (<div>&#10003; I recommend this product</div>);
  } else {
    recommend = (<div></div>);
  }

  // create element that will render if sales team responded to review
  let response;
  if (!props.review.response) {
    response = (<div>{props.review.response}</div>);
  } else {
    response = (<div></div>);
  }



  return (
    <div className="reviewTile">

      <div className="reviewTileHeader">
        <div>
          <Stars rating={props.review.rating} starRatedColor={"black"} numberOfStars={5} starDimension={"2vh"} starSpacing={"0vh"} />
        </div>
        <div>
          <span>{props.review.reviewer_name}, </span>
          <span>{DateTime.fromISO(props.review.date).toFormat('MMMM dd, yyyy')}</span>
        </div>
      </div>

      {/* by default, only first 60 chars should appear in summary. if more exist, should show truncate and show '...' */}
      {/* by default, only first 250 chars should appear in body. if more exist, button should appear to open modal */}
      {/* still need to implement this */}
      <div className="reviewTileSummary">{props.review.summary}</div>
      <div className="reviewTileBody">{props.review.body}</div>

      {/* if recommended, display recommened */}
      {recommend}

      {/* if sales team response exists, display here */}
      {response}

      <div className="reviewTileFooter">
        <div className="reviewTileHelpful">Helpful? <span>Yes ({props.review.helpfulness}) </span></div>
        <div className="reviewTileReport">| Report</div>
      </div>

    </div>
  );
};

export default ReviewTile;
