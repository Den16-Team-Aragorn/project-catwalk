import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';

const SelectSize = () => {

  const {currentItem} = useContext(GlobalContext);
  const {allStyles, styles, setAllStyles} = useContext(OverviewContext);
  const [skus, setSkus] = useState([]);
  const [sizeAndQuantity, setSizeAndQuantity] = useState([]);
  const [currentSize, setCurrentSize] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("-");
  const [quantityArray, setQuantityArray] = useState([]);

  useEffect(() => {
      if(allStyles.results !== undefined) {
        setSkus(allStyles.results[0].skus);
        if(skus != undefined) {
          setSizeAndQuantity(Object.values(skus));
        }
      }
  }, [allStyles, currentItem])

  const handleChange = (e) => {

    setCurrentSize(e.target.value);

    for(let key in sizeAndQuantity) {

      if(sizeAndQuantity[key].size === e.target.value) {
        setCurrentQuantity(sizeAndQuantity[key].quantity <= 15 ? sizeAndQuantity[key].quantity
          : 15 )
      }


      let tempArr = [];
      for(let i = 1; i <= currentQuantity; i++) {
        tempArr.push(i);
      }
      setQuantityArray(tempArr);


    }

  }



return (
  <div>
    <select name="selectList" className="selectList" onChange={handleChange}>
      <option value="option 1">Select Size</option>
      {sizeAndQuantity !== [] ? Object.values(sizeAndQuantity).map((element, index) => {
        return (<option key={index} name={element.size}>{element.size}</option>)
      })
      : <option>loading</option>
    }

    </select>
    {currentSize === "" ?
    <select name="selectList" className="selectList">
      <option value="option 1">-</option>
    </select> : <select name="selectList" className="selectList">
    {
      quantityArray !== [] ? quantityArray.map((element, index) => {
       return <option value="option 1" key={index}>{element}</option>
      }) :
      <option value="option 1">'-'</option>
    }
    </select>
}
  </div>
)
}

export default SelectSize;