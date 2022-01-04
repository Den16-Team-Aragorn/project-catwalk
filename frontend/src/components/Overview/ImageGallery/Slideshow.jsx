import React, {useState, useContext, useEffect} from 'react';
import {FaChevronCircleLeft, FaChevronCircleRight, FaExpand} from "react-icons/fa";


  // class Slideshow extends React.Component {

  //   state = {
  //     current: 0,
  //     clicked: false
  //   }
  const Slideshow = (props) => {
    const [current, setCurrent] = useState(0);
    const [clicked, setClicked] = useState(false);


    // goBack = () => {
    //   const { images } = this.props
    //   const { current } = this.state
    //   current >= images.length - 1 ? this.setState({ current: 0 }) : this.setState({ current: current + 1 })
    // }
      const goBack = () => {
        console.log('clicked back');
        let images = props.images;
        current >= images.length - 1 ? setCurrent(0) : setCurrent(current + 1)
      }
      const goForward = () => {
        console.log('clicked forward');
        let images = props.images;
        current === 0 ? setCurrent(images.length -1) : setCurrent(current - 1)
      }

    // goForward = () => {
    //   const { images } = this.props
    //   const { current } = this.state
    //   current === 0 ? this.setState({ current: images.length - 1 }) : this.setState({ current: current - 1 })
    // }

    const expand = () => {
      setClicked(!clicked);
    }

    // expand = () => {
    //   this.setState({clicked: !this.state.clicked});
    // }

    return(
            <div className={!clicked ? "overview-slideshow-container" : "overview-slideshow-container-clicked"}>
              <FaExpand className="overview-expand-button" onClick={expand}/>
              <div
                className="overview-slideshow-imageContainer"
                style={{
                  backgroundImage: `url(${props.images[current] || props.images[props.images.length - 1]})`
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


  //   render() {
  //     const { current } = this.state;
  //     const { images } = this.props;
  //     return(
  //       <div className={!this.state.clicked ? "overview-slideshow-container" : "overview-slideshow-container-clicked"}>
  //         <FaExpand className="overview-expand-button" onClick={this.expand}/>
  //         <div
  //           className="overview-slideshow-imageContainer"
  //           style={{
  //             backgroundImage: `url(${images[current]})`
  //           }}>

  //           <div className="overview-slideshow-controls">
  //             <button className="overview-slideshow-controls__button" onClick={this.goBack}>
  //               <FaChevronCircleLeft />
  //             </button>
  //             <button className="overview-slideshow-controls__button" onClick={this.goForward}>
  //             <FaChevronCircleRight />
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }
  // }


  export default Slideshow;