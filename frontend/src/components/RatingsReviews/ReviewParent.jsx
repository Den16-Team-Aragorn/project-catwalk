import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewMetadata from './ReviewMetadata.jsx';
import axios from 'axios';


const ReviewParent = () => {

  // get current App item from global context
  const {currentItem} = useContext(GlobalContext);

  // state variables to store review meta info
  const [productId, setProductId] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [percentRecommend, setPercentRecommend] = useState(0);
  const [oneStarRatings, setOneStarRatings] = useState(0);
  const [twoStarRatings, setTwoStarRatings] = useState(0);
  const [threeStarRatings, setThreeStarRatings] = useState(0);
  const [fourStarRatings, setFourStarRatings] = useState(0);
  const [fiveStarRatings, setFiveStarRatings] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [characteristics, setCharacteristics] = useState({});

  // function retrieves review meta info and updates state
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
      });
  };

  // any change in currentItem should trigger a new fetch request for meta info
  useEffect( () => {
    fetchReviewMetadata();
  }, [currentItem]);


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
          avgRating,
          percentRecommend,
          oneStarRatings,
          twoStarRatings,
          threeStarRatings,
          fourStarRatings,
          fiveStarRatings,
          totalReviews,
          characteristics
        } }>

          <div className="reviewParentContainer">
            <ReviewMetadata />
            <ReviewList />
          </div>

        </ReviewContext.Provider>

      </div>
    );
  }

};

export default ReviewParent;
