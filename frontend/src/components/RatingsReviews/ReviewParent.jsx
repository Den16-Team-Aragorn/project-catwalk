import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewListContainer from './ReviewListContainer.jsx';
import ReviewMetadata from './ReviewMetadata.jsx';
import axios from 'axios';


const ReviewParent = () => {

  // console.log('rendering reviewParent...');

  // get current App item from global context
  const {currentItem} = useContext(GlobalContext);

  // state variables to store reviews and meta info
  const [productId, setProductId] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [avgRating, setAvgRating] = useState(0);
  const [percentRecommend, setPercentRecommend] = useState(0);
  const [oneStarRatings, setOneStarRatings] = useState(0);
  const [twoStarRatings, setTwoStarRatings] = useState(0);
  const [threeStarRatings, setThreeStarRatings] = useState(0);
  const [fourStarRatings, setFourStarRatings] = useState(0);
  const [fiveStarRatings, setFiveStarRatings] = useState(0);
  const [characteristics, setCharacteristics] = useState({});

  const [visibleReviewsCounter, setVisibleReviewsCounter] = useState(2);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [sortOn, setSortOn] = useState('relevance');

  // function retrieves review meta info for currentItem and updates state
  const fetchReviewMetadata = () => {
    axios
      .get(`/api/reviews/meta?product_id=${currentItem.id}`)
      .then( ({data}) => {

        // set state variables upon successful get request
        setProductId(data.product_id);
        setCharacteristics(data.characteristics);
        setOneStarRatings(Number(data.ratings[1]) || 0);
        setTwoStarRatings(Number(data.ratings[2]) || 0);
        setThreeStarRatings(Number(data.ratings[3]) || 0);
        setFourStarRatings(Number(data.ratings[4]) || 0);
        setFiveStarRatings(Number(data.ratings[5]) || 0);

        let rec = Number(data.recommended.true) || 0;
        let notRec = Number(data.recommended.false) || 0;
        setPercentRecommend( ((rec / (rec + notRec)) * 100).toFixed(0) );

        let oneStar = Number(data.ratings[1]) || 0;
        let twoStar = Number(data.ratings[2]) || 0;
        let threeStar = Number(data.ratings[3]) || 0;
        let fourStar = Number(data.ratings[4]) || 0;
        let fiveStar = Number(data.ratings[5]) || 0;
        let totalStars = oneStar + twoStar*2 + threeStar*3 + fourStar*4 + fiveStar*5;
        let totalRev = oneStar + twoStar + threeStar + fourStar + fiveStar;
        setTotalReviews(totalRev);
        setAvgRating( (totalStars / totalRev).toFixed(1) );
      })
      .catch( (err) => {
        console.log('error occurred in fetchReviewMetadata..');
      });
  };

  // function retrieves reviews for currentItem and updates state
  const fetchProductReviews = () => {

    // console.log('made it to fetchProductReviews function...');

    axios
      .get(`/api/reviews?product_id=${currentItem.id}&sort=${sortOn}&count=${visibleReviewsCounter}`)
      .then( ({data}) => {

        // console.log('made it to fetchProductReviews axios.then')

        setVisibleReviews(data.results);
      })
      .catch( (err) => {
        console.log('error occurred in fetchProductReviews');
      });
  };

  // any change in currentItem should trigger a new fetch request for meta info and reviews ***THIS SHOULD ALSO TRIGGER RESET OF SORT, FILTER, VISIBLE, ETC.
  useEffect( () => {
    fetchReviewMetadata();
    fetchProductReviews();
  }, [currentItem]);

  // any change in sortOn, visibleReviewCount, or ________ should trigger a new fetch request for reviews
  useEffect( () => {

    // console.log('change detected in visibleReviewsCounter');
    if (visibleReviewsCounter < totalReviews) {
      fetchProductReviews();
    }
  }, [sortOn, visibleReviewsCounter]);


  // render our components once review metadata has been fetched
  if (productId === 0) {
    return (<div className="reviewParent">Loading...</div>);

  } else {

    return (
      <div className="reviewParent">
        RATINGS & REVIEWS

        {/* context provider gives child components access to parent state */}
        <ReviewContext.Provider value={ {
          productId,
          totalReviews,
          avgRating,
          percentRecommend,
          oneStarRatings,
          twoStarRatings,
          threeStarRatings,
          fourStarRatings,
          fiveStarRatings,
          characteristics,
          visibleReviewsCounter, setVisibleReviewsCounter,
          visibleReviews,
          sortOn
        } }>

          <div className="reviewParentContainer">
            <ReviewMetadata />
            <ReviewListContainer />
          </div>

        </ReviewContext.Provider>

      </div>
    );
  }

};

export default ReviewParent;
