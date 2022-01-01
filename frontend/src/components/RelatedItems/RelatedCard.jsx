import React, { useState, useContext, useEffect } from 'react';

const RelatedCard = ({ slide }) => {
    const [Hover, setHover] = useState(false);


    return (
        <div className='relatedCard'>

            {Hover && (
                <div>
                    <img className='hoverimage' src={slide.results[0].photos[1].thumbnail_url} />
                </div>
            )}
            <img onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='carouselImage' src={slide.results[0].photos[0].thumbnail_url} />
        </div>
    );
};

export default RelatedCard;

// {slide.results[0].photos.map((result, index) => {
//     return (
//     <img key={index} className='hoverimage' src={result.thumbnail_url} />
//     )
// })}

