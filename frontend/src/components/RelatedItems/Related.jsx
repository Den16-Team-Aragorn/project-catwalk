import React, { useState, useEffect, useContext } from 'react';
import RelatedItemsCarousel from './RelatedItemsCarousel.jsx';
import GlobalContext from '../../Contexts/index.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import RelatedContext from './RelatedContext.jsx';
import axios from 'axios';

const Related = () => {
  const { currentItem, setCurrentItem } = useContext(GlobalContext);
  const [relatedItems, setRelatedItems] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [relatedDataDetail, setRelatedDataDetail] = useState([]);
  const [relatedReviews, setRelatedReviews] = useState([]);
  const [outfitData, setOutfitData] = useState([{
    image: 'https://thumbs.dreamstime.com/b/add-icon-plus-sign-simple-vector-cross-illustration-163270948.jpg'
  }]);

  let related = [];
  let getStyles = [];
  let getProducts = [];
  let getReviews = [];

  useEffect(() => {
    var relatedObjects = [];
    var relatedObjectsDetail = [];
    var relatedReviewData = [];
    related.push(axios.get(`/api/products/${currentItem.id}/related`).then(
      (result) => {return result.data}));
    Promise.all(related).then((values) => {
      values[0].forEach((item, index) => {
        if (item != 44389) {
          getStyles.push(axios.get(`/api/products/${item}/styles`).then((result) => { return result.data }));
          getProducts.push(axios.get(`/api/products/${item}`).then((result) => { return result.data }));
          getReviews.push(axios.get(`/api/reviews/meta?product_id=${item}`));
        };
      });
    }).catch(err => {
      console.log(err)
    }).then(() => {
      Promise.all(getStyles).then((results) => {
        relatedObjects.push(results);
        setRelatedData(relatedObjects);
      }).catch(err => {
        console.log(err)
      });;
      Promise.all(getProducts).then((results) => {
        relatedObjectsDetail.push(results);
        setRelatedDataDetail(relatedObjectsDetail);
      }).catch(err => {
        console.log(err)
      });;
      Promise.all(getReviews).then((results) => {
        var reviewArray = [];
        results.forEach((item, index) => {
        let oneStar = Number(item.data.ratings[1]) || 0;
        let twoStar = Number(item.data.ratings[2]) || 0;
        let threeStar = Number(item.data.ratings[3]) || 0;
        let fourStar = Number(item.data.ratings[4]) || 0;
        let fiveStar = Number(item.data.ratings[5]) || 0;
        let totalStars = oneStar + twoStar*2 + threeStar*3 + fourStar*4 + fiveStar*5;
        let totalRev = oneStar + twoStar + threeStar + fourStar + fiveStar;
        if (totalRev === 0) {
          reviewArray.push({Rating: 0});
        } else {
          reviewArray.push({Rating: Number((totalStars / totalRev).toFixed(1)) });
        }
        setRelatedReviews(reviewArray);

        })
      }).catch(err => {
        console.log(err)
      });
    }).catch(err => {
      console.log(err)
    });;
  }, [currentItem]);

  if (currentItem.id == null) {
    return null
  }

  if (relatedDataDetail.length === 0) {
    return <div>LOADING</div>
  }

  return (
    <div className="related">
      <div className="relateditemscarousel">
        <RelatedContext.Provider value={{ relatedItems, relatedReviews, setRelatedItems, outfitData, setOutfitData, relatedData, setRelatedData, relatedDataDetail }}>
          <div className="relatedTitle">Related Items</div>
          <RelatedItemsCarousel />
          <div className="relatedTitle">My Outfit</div>
          <OutfitCarousel />
        </RelatedContext.Provider>
      </div>
    </div>
  );
};


export default Related;
