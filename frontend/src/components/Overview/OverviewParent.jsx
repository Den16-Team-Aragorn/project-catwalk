/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInformationParent from './ProductInformation/ProductInformationParent.jsx';
import ProductDescriptionParent from './ProductDescription/ProductDescriptionParent.jsx';

const OverviewParent = () => {
  return (
    <div>
      <div className="overviewParent">
          <ImageGallery />
          <ProductInformationParent />
          <ProductDescriptionParent />
      </div>
    </div>
  );
};

export default OverviewParent;
