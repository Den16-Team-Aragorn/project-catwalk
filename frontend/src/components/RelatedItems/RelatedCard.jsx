import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import RelatedContext from './RelatedContext.jsx';
import StarRatings from 'react-star-ratings';


const RelatedCard = ({ slide }) => {
    const {relatedDataDetail} = useContext(RelatedContext)
    const [Hover, setHover] = useState(false);
    return (
        <div className='relatedCard'>
            {/* <button>actionbuttontoadd</button> */}
            <img onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='carouselImage' src={slide.results[0].photos[0].thumbnail_url} />
            <div className="relatedInfo">
                <p>{slide.name}</p>
                <p>{slide.category}</p>
                </div>
                <div className="relatedInfo2">
                <p>${slide.results[0].original_price}</p>
                <StarRatings className="relatedStars" rating={slide.Rating || 0} starDimension={"2vh"} starSpacing={"0vh"} starRatedColor={'#8FC1E3'}/>
            </div>
        </div>

    );
};

export default RelatedCard;



// {Hover && (
//     <div className='hoverimage'>
//         <img className='singleHover' src={slide.results[0].photos[0].thumbnail_url} />
//         <img className='singleHover' src={slide.results[0].photos[1].thumbnail_url} />
//     </div>
// )}