import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';
import axios from 'axios';
import StyleCard from './StyleCard.jsx';

const OverviewStyle = () => {
  const {currentItem, setCurrentItem} = useContext(GlobalContext);
  const {styles, setStyles, setStyle, allStyles} = useContext(OverviewContext);
  const [item, setItem] = useState('');
  const [styleId, setStyleId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState("");



  useEffect(() => {
    if(currentItem.id !== undefined) {
    axios.get(`/api/products/${currentItem.id}/styles`).then((res) => {
      setItem(res.data.results[0].name)
      setStyleId(res.data.results);
    }).catch((err) => {
      console.log('error in overviewstyle');
    })}
  }, [currentItem]);

  const handleClick = (e) => {
    if(count !== "") {
    count.classList.remove('overview-style-selected');
    count.classList.add("overviewImages");
    }
    e.target.classList.remove('overviewImages');
    e.target.classList.add('overview-style-selected');
    setCount(event.target);
  }

  return (
    <div>
      <p className='style--'>STYLE > {currentItem.id === undefined ? 'Loading...' : item}</p>
      <div className="overviewMap">
        {styleId.map((element) => (
          <StyleCard key={element.style_id} item={element} onClick={handleClick}/>
        ))}
      </div>
    </div>
  );
};

export default OverviewStyle;