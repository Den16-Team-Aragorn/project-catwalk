import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx'
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx';

const RelatedItemsCarousel = () => {
  const {currentItem} = useContext(GlobalContext);
  const {relatedItems} = useContext(RelatedContext);
  const {setRelatedItems} = useContext(RelatedContext);

  const fetchRelated = (productID) => {
    axios.get(`/api/products/${productID}/related`).then((res) => {
      setRelatedItems(res.data);
    })
  };


  useEffect(() => {
      fetchRelated(currentItem.id);
  }, [currentItem]);

  return (
    <div>related items carousel
      <div>items related to : {currentItem.name} </div>
      <div>
        {relatedItems.map((item, index) => {

          return (
              <RelatedCard key={index} item={item}/>
          )
        })}
      </div>

    </div>
  );

};

export default RelatedItemsCarousel;
