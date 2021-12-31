import React, {useState} from 'react';
import RelatedItemsCarousel from './RelatedItemsCarousel.jsx'
import OutfitCarousel from './OutfitCarousel.jsx'
import RelatedContext from './RelatedContext.jsx'
import { OutfitData1 } from './OutfitData.jsx'


const Related = () => {
  const [relatedItems, setRelatedItems] = useState([]);
  return (
    <div className="related">Related
      <div className="relateditemscarousel">
        <RelatedContext.Provider value={{relatedItems, setRelatedItems}}>
          <RelatedItemsCarousel />
          <OutfitCarousel slides={OutfitData1} />
        </RelatedContext.Provider>
      </div>
    </div>

  );
};

export default Related;
