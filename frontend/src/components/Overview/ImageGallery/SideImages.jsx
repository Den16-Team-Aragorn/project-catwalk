import React, {useContext, useEffect, useState} from 'react';

const SideImages = (props) => {

  return (<div className="overviewSideImageBox" >
    {props.images.slice(0,6).map((element) => {
      return <img key={element} src={element} className="overviewSideImage"/>
    })}
  </div>);
}

export default SideImages;