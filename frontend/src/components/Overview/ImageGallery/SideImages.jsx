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

  const handleClick = (e) => {
    if(count !== "") {
    count.classList.remove('overview-sideImage-selected');
    count.classList.add("overviewSideImage");
    }
    e.target.classList.remove('overviewSideImage');
    e.target.classList.add('overview-sideImage-selected');
    setCount(event.target);
    console.log(e.target);
    setCurrent(e.target.id);

  }

  const handleScrollDown = () => {

    if(end < imagesLength) {
      setStart(start + 1);
      setEnd(end + 1);

    } else {
      setStart(0);
      setEnd(6);

    }

    setPhotoArray(props.images.slice(start, end));



  }

   const handleScrollUp = () => {

    if(start ) {
      setStart(start + 1);
      setEnd(end + 1);

    } else {
      setStart(0);
      setEnd(6);

    }
    setPhotoArray(props.images.slice(start, end));

   }

  useEffect(() => {
    if(props.images !== undefined) {
    setPhotoArray(props.images.slice(0, 6));
    setImagesLength(props.images.length);
    }

  }, [props.images]);

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