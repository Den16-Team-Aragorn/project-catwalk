import React, { useState, useEffect } from 'react';
import GlobalContext from '../Contexts/index.jsx';
import Header from './Header/Header.jsx';
import OverviewParent from './Overview/OverviewParent.jsx';
import Related from './RelatedItems/Related.jsx';
import ReviewParent from './RatingsReviews/ReviewParent.jsx';
import axios from 'axios';
import SitewideAnnouncement from './Header/SitewideAnnouncement.jsx';

const App = () => {

  const [currentItem, setCurrentItem] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const fetchItemData = (productID) => {
    axios.get(`/api/products/${productID}`).then((res) => {
      setCurrentItem(res.data);
    }).catch((err) => {
      console.log('error in App.jsx fetchItemData');
    })
  };

  const fetchAllProducts = () => {
    axios.get('/api/products?count=1011').then((res) => {
      setAllProducts(res.data);
    }).catch((err) => {
      console.log('error in App.jsx fetchAllProducts');
    })
  };

  function getRandomStart(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }



  useEffect(() => {
    //fetchAllProducts();
     fetchItemData(44391)
    //fetchItemData(getRandomStart(44388, 45398));
  }, []);

  //added this to stop bugs

  if (currentItem.id == null) {
    return <div>LOADING</div>
  }

  return (
  <div>
    <GlobalContext.Provider value={ {currentItem, setCurrentItem, allProducts}}>
      <Header />
      <SitewideAnnouncement />
      <OverviewParent />
      <Related />
      <ReviewParent />
    </GlobalContext.Provider>
  </div>
);
}

export default App;
