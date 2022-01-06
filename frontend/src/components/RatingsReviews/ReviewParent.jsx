import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewListContainer from './ReviewListContainer.jsx';
import ReviewMetadata from './ReviewMetadata.jsx';
import axios from 'axios';


const ReviewParent = () => {

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

  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState({allVisible: true, 1: false, 2: false, 3: false, 4: false, 5: false});
  const [visibleReviewsCounter, setVisibleReviewsCounter] = useState(2);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [sortOn, setSortOn] = useState('relevant');

  // function retrieves review meta info for currentItem, then retrieves reviews
  const fetchReviewMetadataAndReviews = () => {
    if (currentItem.id !== undefined) {
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
        if (notRec === 0 && rec > 0) {
          setPercentRecommend(100);
        } else if (notRec === 0) {
          setPercentRecommend(0);
        } else {
          setPercentRecommend( Number(((rec / (rec + notRec)) * 100).toFixed(0)) );
        }

        let oneStar = Number(data.ratings[1]) || 0;
        let twoStar = Number(data.ratings[2]) || 0;
        let threeStar = Number(data.ratings[3]) || 0;
        let fourStar = Number(data.ratings[4]) || 0;
        let fiveStar = Number(data.ratings[5]) || 0;
        let totalStars = oneStar + twoStar*2 + threeStar*3 + fourStar*4 + fiveStar*5;
        let totalRev = oneStar + twoStar + threeStar + fourStar + fiveStar;
        setTotalReviews(totalRev);

        if (totalRev === 0) {
          setAvgRating(0);
        } else {
          setAvgRating( Number((totalStars / totalRev).toFixed(1)) );
        }

      })
      .then( () => {
        fetchProductReviews();
      })
      .catch( (err) => {
        console.log('error occurred in fetchReviewMetadata..');
      });
    }
  };

  // function retrieves all reviews for currentItem
  const fetchProductReviews = () => {
    if (currentItem.id !== undefined) {
      axios
      .get(`/api/reviews?product_id=${currentItem.id}&sort=${sortOn}&count=1000`)
      .then( ({data}) => {
        setAllReviews(data.results);
      })
      .catch( (err) => {
        console.log('error occurred in fetchProductReviews');
      });
    }
  };

  // any change in currentItem should reset review and sort info and trigger a new fetch request for meta info and reviews
  useEffect( () => {
    setVisibleReviewsCounter(2);
    fetchReviewMetadataAndReviews();
  }, [currentItem]);

  // any change in sortOn should trigger a new fetch request for reviews
  useEffect( () => {
    fetchProductReviews();
  }, [sortOn]);

  // any change in allReviews (current product change or new sort) should refresh the filtered reviews
  useEffect( () => {
    setVisibleReviewsCounter(2);
    setFilteredReviews(filterReviews());
  }, [allReviews]);

  // any change in filteredReviews (current product change, new sort, ) should reset visible reviews
  useEffect( () => {
    setVisibleReviews(filteredReviews.slice(0, visibleReviewsCounter));
  }, [filteredReviews]);

  // any change in visibleReviewsCounter should update visible reviews (if statement reduces redundant renders)
  useEffect( () => {
    if (visibleReviewsCounter > 2) {
      setVisibleReviews(filteredReviews.slice(0, visibleReviewsCounter));
    }
  }, [visibleReviewsCounter]);

  // any change in ratingFilter should update filteredReviews
  useEffect( () => {
    setFilteredReviews(filterReviews());
  }, [ratingFilter]);


  // filter all reviews based on active filters
  const filterReviews = () => {

    let reviews = allReviews.slice();

    if (ratingFilter.allVisible === true) {
      return reviews;
    } else {
      for (let i = 0; i < reviews.length; i++) {
        if (ratingFilter[reviews[i].rating] === false) {
          reviews.splice(i, 1);
          i--;
        }
      }
      // console.log(reviews);
      return reviews;
    }
  };


  // render our components once review metadata has been fetched
  if (productId === 0) {
    return (<div className="reviewParent">Loading...</div>);

  } else {

    return (
      <div id="reviewParent" className="reviewParent">
        <div className="reviewParentHeader">
          RATINGS & REVIEWS
        </div>

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
          allReviews, setAllReviews,
          ratingFilter, setRatingFilter,
          visibleReviewsCounter, setVisibleReviewsCounter,
          visibleReviews,
          sortOn, setSortOn,
          fetchProductReviews
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
