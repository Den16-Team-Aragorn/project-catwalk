/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';
import Arrow from './Arrow.jsx';

const ImageGallery = () => {
  return (
    <div className="imageGalleryParent">
      <Arrow direction='left' func={() => {}} glyph="&#9664;"/>
      <ImageCarousel />
      <Arrow direction='right' func={() => {}} glyph="&#9654;"/>
    </div>

  );
};

export default ImageGallery;
