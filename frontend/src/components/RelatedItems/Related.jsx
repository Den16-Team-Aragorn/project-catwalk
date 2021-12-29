import React, {useState} from 'react';
import RelatedItemsCarousel from './RelatedItemsCarousel.jsx'
import OutfitCarousel from './OutfitCarousel.jsx'
import RelatedContext from './RelatedContext.jsx'
import { OutfitData } from './OutfitData.jsx'
import { RelatedImages } from './RelatedImages.jsx'

const Related = () => {
  const [relatedItems, setRelatedItems] = useState([]);
  return (
    <div className="related">Related
      <div className="relateditemscarousel">
        <RelatedContext.Provider value={{relatedItems, setRelatedItems}}>
          <RelatedItemsCarousel slides={RelatedImages}/>
          <OutfitCarousel slides={OutfitData} />
        </RelatedContext.Provider>
      </div>
    </div>

  );
};

export default Related;
