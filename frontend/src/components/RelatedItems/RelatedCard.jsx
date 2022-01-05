import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx';
import StarRatings from 'react-star-ratings';
import ReactModal from 'react-modal';
import axios from 'axios'


const RelatedCard = ({ slide }) => {
    ReactModal.setAppElement('#app');
    const { relatedDataDetail } = useContext(RelatedContext);
    const [Hover, setHover] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { currentItem, setCurrentItem } = useContext(GlobalContext);

    const relatedSetter = (slide) => {
        fetchItemData(slide.product_id);
      }

      const fetchItemData = (productID) => {
        if (productID === undefined) {
          return null;
        } else {
          axios.get(`/api/products/${productID}`).then((res) => {
            setCurrentItem(res.data);
          }).catch((err) => {
            console.log('error in relatedItemsCarousel', err);
          })
        }
      };

    return (
        <div className='relatedCard'>
            {/* <button>actionbutton</button> */}
            <img onClick={() => relatedSetter(slide)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='carouselImage' src={slide.results[0].photos[0].thumbnail_url} />
            <div onClick={(event) => {
                event.stopPropagation()
                setShowModal(true)}} className="relatedInfo">
                <p>{slide.name}</p>
                <p>{slide.category}</p>
                </div>
                <div className="relatedInfo2">
                <p>${slide.results[0].original_price}</p>
                <StarRatings className="relatedStars" rating={slide.Rating || 0} starDimension={"2vh"} starSpacing={"0vh"} starRatedColor={'#8FC1E3'}/>
            </div>
            <div className="relatedInfo2">
                <p>${slide.results[0].original_price}</p>
                <StarRatings className="relatedStars" rating={slide.Rating || 0} starDimension={"2vh"} starSpacing={"0vh"} starRatedColor={'#8FC1E3'} />
            </div>
            <ReactModal isOpen={showModal} className="relatedModal">
                <button className="relatedModalCloseBtn" onClick={(event) => {
                    event.stopPropagation()
                    setShowModal(false) }}>X</button>
                <div className="relatedModalSlide">
                    <p>{slide.name}</p>
                    <p>{slide.category}</p>
                    <p>{slide.slogan}</p>
                    <p>${slide.results[0].original_price}</p>
                    <StarRatings className="relatedStars" rating={slide.Rating || 0} starDimension={"2vh"} starSpacing={"0vh"} starRatedColor={'#8FC1E3'} />
                </div>
                <div className="relatedModalGuide">
                    <p>Item Name</p>
                    <p>Category</p>
                    <p>Slogan</p>
                    <p>Current Price</p>
                </div>
                <div className="relatedModalCurrent">
                    <p>{currentItem.name}</p>
                    <p>{currentItem.category}</p>
                    <p>{currentItem.slogan}</p>
                    <p>${currentItem.default_price}</p>
                </div>
            </ReactModal>
        </div>

    );
};

export default RelatedCard;

