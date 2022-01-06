import React, {useState, useContext, useEffect} from 'react';
import {FaChevronCircleLeft, FaChevronCircleRight, FaExpand} from "react-icons/fa";
import OverviewContext from '../../../Contexts/OverviewContext.jsx'


  const Slideshow = (props) => {
    const {current, setCurrent} = useContext(OverviewContext);
    const [clicked, setClicked] = useState(false);

      const goBack = () => {
        let images = props.images;
        current === 0 ? setCurrent(images.length - 1) : setCurrent(current - 1);
      }
      const goForward = () => {
        let images = props.images;
        current >= images.length - 1 ? setCurrent(0) : setCurrent(current + 1);
      }



    const expand = () => {
       setClicked(!clicked);
    }


    return(
            <div className={!clicked ? "overview-slideshow-container" : "overview-slideshow-container-clicked"}>
              <FaExpand className="overview-expand-button" onClick={expand}/>
              <div
                className="overview-slideshow-imageContainer"
                style={{
                  backgroundImage: `url(${props.images[current] || props.images[props.images.length]})`
                }}>

                <div className="overview-slideshow-controls">
                  <button className="overview-slideshow-controls__button" onClick={goBack}>
                    <FaChevronCircleLeft />
                  </button>
                  <button className="overview-slideshow-controls__button" onClick={goForward}>
                  <FaChevronCircleRight />
                  </button>
                </div>
              </div>
            </div>
          )
        }





  export default Slideshow;