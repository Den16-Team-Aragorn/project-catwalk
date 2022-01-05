import React, {useState, useContext} from 'react';
import ReactModal from 'react-modal';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewPostForm from './ReviewPostForm.jsx';


const ReviewListButtons = () => {

  // bind modal to app element. something to do with screen readers. works, but throws error if not used.
  ReactModal.setAppElement('#app');

  // import state
  const {totalReviews, visibleReviewsCounter, setVisibleReviewsCounter} = useContext(ReviewContext);

  // set state variables
  const [showModal, setShowModal] = useState(false);

  // click event handler for more reviews button
  const moreReviewsClickHandler = () => {
    if (visibleReviewsCounter < totalReviews) {
      setVisibleReviewsCounter(visibleReviewsCounter + 2);
    }
  };

  //create modal element
  const modal = (
    <ReactModal isOpen={showModal} className="reviewPostModal">
      <ReviewPostForm setShowModal={setShowModal} />
    </ReactModal>);


  // render add review button, and more reviews button if there are more to display
  if (visibleReviewsCounter < totalReviews) {
    return (
      <div className="reviewListButtons">
        <button className="reviewListButton" onClick={ () => { moreReviewsClickHandler() }}>MORE REVIEWS</button>
        <button className="reviewListButton" onClick={ () => {setShowModal(true)}}>ADD A REVIEW +</button>
        {modal}
      </div>
    )
  } else {
    return (
      <div className="reviewListButtons">
        <button className="reviewListButton" onClick={ () => {setShowModal(true)}}>ADD A REVIEW +</button>
        {modal}
      </div>
    );
  }

};

export default ReviewListButtons;