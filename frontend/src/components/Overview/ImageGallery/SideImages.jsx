import React, {useContext, useEffect, useState} from 'react';
import OverviewContext from '../../../Contexts/OverviewContext.jsx'

const SideImages = (props) => {

  const {currentPhoto, setCurrentPhoto} = useContext(OverviewContext);

  const handleClick = (e) => {
    setCurrentPhoto(e.target.currentSrc);
    console.log(e);
  }

  return (<div className="overviewSideImageBox" >
    {props.images.slice(0,6).reverse().map((element) => {
      return <img key={element} src={element} className="overviewSideImage" onClick={handleClick}/>
    })}
  </div>);
}

export default SideImages;