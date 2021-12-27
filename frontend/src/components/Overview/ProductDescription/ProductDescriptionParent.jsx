/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';

const ProductDescriptionParent = () => {

const {currentItem} = useContext(GlobalContext);
console.log(currentItem);
  return (
    <div>{currentItem.id}</div>
  );
};

export default ProductDescriptionParent;
