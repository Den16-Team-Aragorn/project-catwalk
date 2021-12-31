/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import {useContext, useState, useEffect} from 'react';
import GlobalContext from '../../../Contexts/index.jsx'
import OverviewContext from '../../../Contexts/OverviewContext.jsx'
import axios from 'axios';
import ImageCarousel from './ImageCarousel.jsx';
import Slideshow from './Slideshow.jsx';

const dummyimages = [
  'https://images.unsplash.com/photo-1534371020656-6b85825f2b1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',

  'https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',

  'https://images.unsplash.com/photo-1518887668165-8fa91a9178be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',

    'https://images.unsplash.com/photo-1531497825193-b208e39d008f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  ]




const ImageGallery = () => {

  const { currentItem, setCurrentItem } = useContext(GlobalContext);
  const {styles, setStyles, setStyle} = useContext(OverviewContext);

  useEffect(() => {

    setStyle();

  }, [currentItem]);

  return (
    <div className="imageGalleryParent">
      <Slideshow images={styles === [] ? dummyimages : styles}/>
    </div>

  );
};

export default ImageGallery;
