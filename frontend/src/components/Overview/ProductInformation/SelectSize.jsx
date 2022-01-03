import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';

const SelectSize = () => {

  const {currentItem} = useContext(GlobalContext);
  const {allStyles, styles, setAllStyles} = useContext(OverviewContext);
  const [skus, setSkus] = useState([]);
  const [sizeAndQuantity, setSizeAndQuantity] = useState([]);
  const [currentSize, setCurrentSize] = useState("");

  useEffect(() => {
      if(allStyles.results !== undefined) {
        setSkus(allStyles.results[0].skus);
        if(skus != undefined) {
          setSizeAndQuantity(Object.values(skus));
        }
      }
  }, [allStyles, currentItem])

  const handleChange = (e) => {
    console.log(e.target);
  }

return (
  <div>
    <select name="selectList" className="selectList" onChange={handleChange}>
      <option value="option 1">Select Size</option>
      {sizeAndQuantity !== [] ? Object.values(sizeAndQuantity).map((element, index) => {
        return (<option key={index}>{element.size}</option>)
      })
      : <option>loading</option>
    }

    </select>
    <select name="selectList" className="selectList">
      <option value="option 1">Quantity</option>
    </select>
  </div>
)
}

export default SelectSize;