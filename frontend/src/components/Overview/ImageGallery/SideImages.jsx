import React, {useContext, useEffect, useState} from 'react';
import OverviewContext from '../../../Contexts/OverviewContext.jsx'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const SideImages = (props) => {

  const [count, setCount] = useState("");
  const [photoArray, setPhotoArray] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const [imagesLength, setImagesLength] = useState(0);
  const {current, setCurrent} = useContext(OverviewContext);
  const [renderedImages, setRenderedImages] = useState([]);

  const handleClick = (e) => {
    if(count !== "") {
    count.classList.remove('overview-sideImage-selected');
    count.classList.add("overviewSideImage");
    }
    e.target.classList.remove('overviewSideImage');
    e.target.classList.add('overview-sideImage-selected');
    setCount(event.target);
    console.log(event.target);

    setCurrent(Number(e.target.id) + start);

  }

  const handleScrollDown = () => {

    // if(start + 6 < imagesLength) {
    //   setStart(start + 1);
    // } else {
    //   setStart(0);
    // }
    start >= imagesLength -1 ? setStart(0) : setStart(start + 1);
    document.getElementsByClassName('overview-sideImage-selected')[0].classList.add('overviewSideImage');
    document.getElementsByClassName('overview-sideImage-selected')[0].classList.remove('overview-sideImage-selected');
  }

   const handleScrollUp = () => {

    // if(start > 0 ) {
    //   setStart(start - 1);

    // } else {
    //   setStart(0);
    // }
    start === 0 ? setStart(0) : setStart(start - 1);
    document.getElementsByClassName('overview-sideImage-selected')[0].classList.add('overviewSideImage');
    document.getElementsByClassName('overview-sideImage-selected')[0].classList.remove('overview-sideImage-selected');



   }

  useEffect(() => {
    if(props.images !== undefined) {
    setImagesLength(props.images.length);
    setPhotoArray(props.images.slice(start,start  + 6));

    }

  }, [props.images, start]);

  return (
  <div className="overviewSideImageBox" >

    <div>  <FaAngleUp className="overview-sideImage-control" onClick={handleScrollUp}/> </div>

    {photoArray.map((element, index) => {
      return <img src={element} className="overviewSideImage" id={index} onClick={handleClick} key={index} />

    })}

    <div>  <FaAngleDown className="overview-sideImage-control" onClick={handleScrollDown}/> </div>

  </div>);
}

export default SideImages;