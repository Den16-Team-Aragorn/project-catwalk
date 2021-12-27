import React, {useState, useContext, useEffect} from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx'
import axios from 'axios';

const RelatedCard = (props) => {
  const [current, setCurrent] = useState([]);
  const [currentStyle, setCurrentStyle] = useState([]);
  const {relatedItems} = useContext(RelatedContext);
  const {currentItem} = useContext(GlobalContext);


  const fetchRelatedItem = (productID) => {
    axios.get(`/api/products/${productID}`).then((res) => {
      setCurrent(res.data);
    })
  };

  const fetchRelatedItemStyle = (productID) => {
    axios.get(`/api/products/${productID}/styles`).then((res) => {
      setCurrentStyle(res.data);
      //console.log(res.data)

    })
  };
  useEffect(() => {
    fetchRelatedItem(props.item);
    fetchRelatedItemStyle(props.item);
}, [currentItem]);


  if (currentStyle.results === undefined) {
    return (
      <div>oops</div>
    )
    console.log('oops')
    } else {
      return (
        <div style={{ height: 50, display: 'flex', justifyContent: 'space-around', flexdirection: 'row', alignitems: 'center' }}>
        <div>item here: {current.name}</div>
        <div>pic here: </div>
        <img src={currentStyle.results[0].photos[0].thumbnail_url}></img>
        </div>
      );
    }
};

export default RelatedCard;