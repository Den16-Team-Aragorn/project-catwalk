import React, {useState} from 'react';
import ReactModal from 'react-modal';
import {DateTime} from 'luxon';
import Stars from 'react-star-ratings';
import axios from 'axios';


const ReviewTile = (props) => {

  // bind modal to app element. something to do with screen readers. works, but throws error if not used.
  ReactModal.setAppElement('#app');

  // set state variables
  const [viewFullBody, setViewFullBody] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');

  // create element that will limit review summary to 60 chars
  let reviewSummary;
  if (props.review.summary.length > 60) {
    reviewSummary = (
      <div className="reviewTileSummary">
        {props.review.summary.slice(0, 60)}...
      </div>);
  } else {
    reviewSummary = (<div className="reviewTileSummary">{props.review.summary}</div>);
  }

  // create element that will limit review body to 250 chars unless 'show more' is clicked on
  let reviewBody;
  if (props.review.body.length > 250) {
    if (!viewFullBody) {
      reviewBody = (
        <div className="reviewTileBody">
          {props.review.body.slice(0, 250)}...
          <span className="reviewTileBodyShowMoreLess" onClick={ () => {setViewFullBody(true)}}>show more +</span>
        </div>);
    } else {
      reviewBody = (
        <div className="reviewTileBody">
          {props.review.body}
          <div className="reviewTileBodyShowMoreLess" onClick={ () => {setViewFullBody(false)}}>show less -</div>
        </div>);
    }
  } else {
    reviewBody = (<div className="reviewTileBody">{props.review.body}</div>);
  }

  // create an element that will display any photos included in the review if they exists
  let photos;
  if (props.review.photos.length > 0) {
    photos = (
      <div className="reviewTilePhotos">
        {props.review.photos.map( (photo) => (
          <img className="reviewTilePhoto" src={photo.url} key={photo.id} onClick={ () => {photoClickEventHandler(event.target.src)}}/>
        ))}
      </div>);
  } else {
    photos = (<div></div>);
  }

  // create element that will render if reviewer recommended the product
  let recommend;
  if (props.review.recommend) {
    recommend = (<div className="reviewTileRecommend">&#10003; I recommend this product</div>);
  } else {
    recommend = (<div></div>);
  }

  // create element that will render if sales team responded to review
  let response;
  if (!props.review.response) {
    response = (<div className="reviewTileResponse">{props.review.response}</div>);
  } else {
    response = (<div></div>);
  }

  // create footer element that will be clickable once. if helpful is clicked, click event is removed and helpful count updated
  let reviewTileFooter;
  if (!helpfulClicked) {
    reviewTileFooter = (
      <div className="reviewTileFooterNotClicked">
        <div style={{marginRight: '1vh'}}>Helpful? </div>
        <div className="reviewTileHelpfulNotClicked" onClick={ () => {helpfulClickEventHandler()}}>Yes</div>
        <div style={{marginLeft: '.25vh'}}>({props.review.helpfulness})</div>
        <div style={{margin: '0 1vh'}}>|</div>
        <div className="reviewTileReportNotClicked" onClick={ () => {reportClickEventHandler()}}>Report</div>
      </div>)
  } else {
    reviewTileFooter = (
    <div className="reviewTileFooterClicked">
      <div style={{marginRight: '1vh'}}>Helpful? </div>
      <div className="reviewTileHelpfulClicked">Yes</div>
      <div style={{marginLeft: '.25vh'}}>({props.review.helpfulness + 1})</div>
      <div style={{margin: '0 1vh'}}>|</div>
      <div className="reviewTileReportClicked">Report</div>
    </div>)
  }

  // click event handlers for review photos
  const photoClickEventHandler = (url) => {
    setModalPhoto(url);
    setShowModal(true);
  };

  // click event handler for helpful. put request is sent to db to update helpful counter, and it is re-rendered locally with count + 1
  const helpfulClickEventHandler = () => {
    axios
      .put(`/api/reviews/${props.review.review_id}/helpful`)
      .then( (res) => {
        setHelpfulClicked(true);
      })
      .catch( (err) => {
        console.log('there was an error in helpfulness put request');
      });
  };


  // click event handler for report. put request is sent to db to remove review from future searches, and it is also hidden locally
  const reportClickEventHandler = () => {
    console.log('You clicked report. functionality is currently disabled to prevent too many reviews from being hidden.');
    console.log('If you wish to test the functionality, un-comment the axios request in /components/RatingReviews/ReviewTile.jsx');

    // THIS IS COMMENTED OUT SO I DONT ACCIDENTALLY REMOVE TOO MANY REVIEWS DURING TESTING. RE-ENABLE BEFORE SUBMITTING
    axios
      .put(`/api/reviews/${props.review.review_id}/report`)
      .then( (res) => {
        setReportClicked(true);
      })
      .catch( (err) => {
        console.log('there was an error in report put request');
      });
  };

  // keep modal picture on top of icons in background
  const customStyles = {
    overlay: {zIndex: 1000}
  };


  // if the review is reported, do not render it, otherwise, display as normal
  if (reportClicked) {
    return (<div className="reviewTile reviewTileHidden"></div>)
  } else {

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

        {/* display first 60 chars of review summary */}
        {reviewSummary}

        {/* display first 250 characters of the review body with the option to view the rest */}
        {reviewBody}

        {/* display any photos included with the review */}
        {photos}

        {/* if recommended, display recommened */}
        {recommend}

        {/* if sales team response exists, display here */}
        {response}

        {/* render tile footer based on whether helpful/report has been clicked or not */}
        {reviewTileFooter}

        {/* modal opens when a review photo is clicked */}


        <ReactModal style={customStyles} isOpen={showModal}>
          <button className="reviewTileModalCloseBtn" onClick={ () => {setShowModal(false)}}>X</button>
          <div>
            <img className="reviewTileModalPhoto" src={modalPhoto} />
          </div>
        </ReactModal>

      </div>
    );
  }


};

export default ReviewTile;
