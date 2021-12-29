import React from 'react';
import {FaChevronCircleLeft, FaChevronCircleRight} from "react-icons/fa";


  class Slideshow extends React.Component {
    state = {
      current: 0,
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

    render() {
      const { current } = this.state;
      const { images } = this.props;
      return(
        <div className="overview-slideshow-container">
          <div
            className="overview-slideshow-imageContainer"
            style={{
              backgroundImage: `url(${images[current]})`
            }}
          >
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