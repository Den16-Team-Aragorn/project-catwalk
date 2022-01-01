import React, {useState, useContext, useEffect} from 'react';
import RelatedContext from './RelatedContext.jsx';
import GlobalContext from '../../Contexts/index.jsx';
import axios from 'axios'
const stateHolder = [{
    image: 'https://thumbs.dreamstime.com/b/add-icon-plus-sign-simple-vector-cross-illustration-163270948.jpg'
  }]

const OutfitCard = ({slide}) => {
    const {outfitData} = useContext(RelatedContext);
    const {setOutfitData} = useContext(RelatedContext);
    const {currentItem} = useContext(GlobalContext);

const addToOutfit = (productID) => {
      if (productID === undefined) {
        return null
      } else {
        axios.get(`/api/products/${productID}`).then((res) => {
          axios.get(`/api/products/${res.data.id}/styles`).then((res) => {
            for (var i = 0; i < outfitData.length; i++) {
              var repeat = false
              if (outfitData[i].image === res.data.results[0].photos[0].thumbnail_url) {
                repeat = true
              }
            } if (repeat === false) {
              stateHolder.push({ image: res.data.results[0].photos[0].thumbnail_url });
              setOutfitData(stateHolder)
            }
          })
        }).catch((err) => {
          console.log('error in OutfitCarousel')
        })
      }
      }

return (
        <div>
        {(slide.image === 'https://thumbs.dreamstime.com/b/add-icon-plus-sign-simple-vector-cross-illustration-163270948.jpg') ? <img onClick={() => addToOutfit(currentItem.id)} className='carouselImage'src={slide.image}/> : <img className='carouselImage'src={slide.image}/>}
        </div>
    );

};

export default OutfitCard;