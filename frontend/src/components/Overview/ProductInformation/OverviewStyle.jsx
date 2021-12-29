import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import axios from 'axios';
import StyleCard from './StyleCard.jsx';

const OverviewStyle = () => {
  const {currentItem, setCurrentItem} = useContext(GlobalContext);
  const [item, setItem] = useState('');
  const [styleId, setStyleId] = useState([]);


  useEffect(() => {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {
      setItem(res.data.results[0].name)
      setStyleId(res.data.results);
    })
  }, [currentItem]);



  return (
    <div>
      <p>STYLE > {currentItem.id === undefined ? 'Loading...' : item}</p>
      <div className="overviewMap">
        {styleId.map((element) => (
          <StyleCard key={element.style_id} item={element} />
        ))}
      </div>
    </div>
  );
};

export default OverviewStyle;