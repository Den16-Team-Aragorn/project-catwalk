import React, { useState, useEffect, useContext } from 'react';
import RelatedItemsCarousel from './RelatedItemsCarousel.jsx'
import GlobalContext from '../../Contexts/index.jsx';
import OutfitCarousel from './OutfitCarousel.jsx'
import RelatedContext from './RelatedContext.jsx'
import axios from 'axios'

const Related = () => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const { currentItem } = useContext(GlobalContext);
  const { setCurrentItem } = useContext(GlobalContext);
  const [outfitData, setOutfitData] = useState([{
    image: 'https://thumbs.dreamstime.com/b/add-icon-plus-sign-simple-vector-cross-illustration-163270948.jpg'
  }]);
  const comboFetch = (productID) => {
    const relatedObjects = [];
    if (productID === undefined) {
      return null
    } else {
      axios.get(`/api/products/${productID}/related`).then((res) => {
        var relatedArray = res.data;
        relatedArray.map((item, index) => {
          if (item != 44389) {
            axios.get(`/api/products/${item}/styles`).then((res) => {
              relatedObjects.push(res.data);
              setRelatedData(relatedObjects);
            }).catch((err) => {
              console.log('error in related', err)
            });
          }
        });
      }).catch((err) => {
        console.log('error in related', err)
      });
    }
  }

  useEffect(() => {
    comboFetch(currentItem.id);
  }, [currentItem]);

  return (
    <div className="related">
      <div className="relateditemscarousel">
        <RelatedContext.Provider value={{ relatedItems, setRelatedItems, outfitData, setOutfitData, relatedData, setRelatedData }}>
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
