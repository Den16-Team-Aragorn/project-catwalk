import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../Contexts/index.jsx';


const RelatedCard = ({ slide }) => {
    const { allProducts } = useContext(GlobalContext);
    const [Hover, setHover] = useState(false);

    return (
        <div className='relatedCard'>
            {Hover && (
                <div className='hoverimage'>
                    <img className='singleHover' src={slide.results[0].photos[0].thumbnail_url} />
                    <img className='singleHover' src={slide.results[0].photos[1].thumbnail_url} />
                </div>
            )}
            <img onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='carouselImage' src={slide.results[0].photos[0].thumbnail_url} />
            <div className="relatedInfo">
                <p>Product ID: {slide.product_id}</p>
                <p>Price: {slide.results[0].original_price}</p>
            </div>
        </div>

    );
};

export default RelatedCard;
