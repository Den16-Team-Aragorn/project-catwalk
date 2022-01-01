import React, {useState, useContext, useEffect} from 'react';
import {FaChevronCircleLeft, FaChevronCircleRight, FaExpand} from "react-icons/fa";


  class Slideshow extends React.Component {
    state = {
      current: 0,
      clicked: false
    }


    goBack = () => {
      const { images } = this.props
      const { current } = this.state
      current >= images.length - 1 ? this.setState({ current: 0 }) : this.setState({ current: current + 1 })
    }

    goForward = () => {
      const { images } = this.props
      const { current } = this.state
      current === 0 ? this.setState({ current: images.length - 1 }) : this.setState({ current: current - 1 })
    }

    expand = () => {
      this.setState({clicked: !this.state.clicked});
    }

    render() {
      const { current } = this.state;
      const { images } = this.props;
      return(
        <div className={!this.state.clicked ? "overview-slideshow-container" : "overview-slideshow-container-clicked"}>
          <FaExpand className="overview-expand-button" onClick={this.expand}/>
          <div
            className="overview-slideshow-imageContainer"
            style={{
              backgroundImage: `url(${images[current]})`
            }}>

            <div className="overview-slideshow-controls">
              <button className="overview-slideshow-controls__button" onClick={this.goBack}>
                <FaChevronCircleLeft />
              </button>
              <button className="overview-slideshow-controls__button" onClick={this.goForward}>
              <FaChevronCircleRight />
              </button>
            </div>
          </div>
        </div>
      )
    }
  }


  export default Slideshow;