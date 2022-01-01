import React from 'react';
import {FaRegStar, FaStar} from 'react-icons/fa';

const AddToCart = () => {

  const handleClick = () => {
    console.log('clicked');
  }

  return (
    <div>
      <select name="selectList" className="selectList">
        <option value="option 1">Add to bag</option>
        <option value="option 2">Option 2</option>
      </select>
      <label className="overview-favorite">
          <input className="overview-checkbox" type="checkbox" />
          <FaRegStar onClick={handleClick}/>
       </label>

    </div>
  )

}

export default AddToCart;