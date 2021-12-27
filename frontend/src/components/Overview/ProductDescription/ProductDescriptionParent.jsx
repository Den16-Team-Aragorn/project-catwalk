/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';
import DescriptionText from './DescriptionText.jsx';
import DescriptionCheckbox from './DescriptionCheckboxes.jsx'

const ProductDescriptionParent = () => {

const {currentItem} = useContext(GlobalContext);

  return (
    <div className="productDescriptionParent">
    <DescriptionText />
    <DescriptionCheckbox />
    </div>
  );
};

export default ProductDescriptionParent;
