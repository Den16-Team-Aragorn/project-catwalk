import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import SelectSize from './SelectSize.jsx';
import AddToCart from './AddToCart.jsx';


const OverviewDropdowns = () => {
  const {currentItem} = useContext(GlobalContext);

  return (
    <div className="dropdown-container">
      <SelectSize />
      <AddToCart />
    </div>
  );
};

export default OverviewDropdowns;