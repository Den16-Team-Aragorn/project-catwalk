/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';

const ImageGallery = () => {
  return (
    <div className="imageGalleryParent">
      Overview Parent
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src="/../../../../overviewImages/img1.jpg" style={{ width: '10%' }} alt="" />
          <div className="text">Caption Text</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src="/../../../../overviewImages/img2.jpg" style={{ width: '10%' }} alt="" />
          <div className="text">Caption Two</div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src="/../../../../overviewImages/img3.jpg" style={{ width: '10%' }} alt="" />
          <div className="text">Caption Three</div>
        </div>

        {/* <button type="button" className="prev" onClick="plusSlides(-1)">&#10094;</button> */}
        {/* <button type="button" className="next" onClick="plusSlides(1)">&#10095;</button> */}
      </div>
    </div>

  );
};

export default ImageGallery;
