import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import OverviewContext from '../../../Contexts/OverviewContext.jsx';

const SelectSize = () => {

  const {currentItem} = useContext(GlobalContext);
  const {allStyles, styles} = useContext(OverviewContext);
  // console.log('allstyles :' + allStyles);
  // console.log('styles :' + styles);

return (
  <div>
    <select name="selectList" className="selectList">
      <option value="option 1">Select Size</option>
      <option value="option 2">Option 2</option>
    </select>
    <select name="selectList" className="selectList">
      <option value="option 1">Quantity</option>
      <option value="option 2">Option 2</option>
    </select>
  </div>
)
}

export default SelectSize;