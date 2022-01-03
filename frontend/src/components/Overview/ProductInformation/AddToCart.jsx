import React, {useState} from 'react';
import {FaRegStar, FaStar, FaCartPlus} from 'react-icons/fa';

const AddToCart = () => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    console.log(clicked);
  }

  const cartClick = () => {
    console.log('cart clicked');
  }

  return (
    <div>
      <button name="overview-add-to-bad" className="overview-add-to-bag" onClick={cartClick}>
        <FaCartPlus className="overview-cart-icon" size="35"/>
      </button>
      <label className="overview-favorite">
          <input className="overview-checkbox" type="checkbox" />
          {
            !clicked ? <FaRegStar onClick={handleClick} className="overview-favorite-star" />
            : <FaStar onClick={handleClick} className="overview-favorite-star-clicked" />
          }
          </label>

    </div>
  )

}

export default AddToCart;