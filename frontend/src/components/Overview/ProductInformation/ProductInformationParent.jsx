/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import OverviewReview from './OverviewReview.jsx';
import OverviewTitle from './OverviewTitle.jsx';
import OverviewStyle from './OverviewStyle.jsx';
import OverviewDropdowns from './OverviewDropdowns.jsx';

const ProductInformationParent = () => {
  return (
    <div className="productInformationParent">
      <OverviewReview />
      <OverviewTitle />
      <OverviewStyle />
      <OverviewDropdowns />
    </div>
  );
};

export default ProductInformationParent;
