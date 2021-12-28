import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';

const DescriptionText = () => {
  const {currentItem} = useContext(GlobalContext);
  return (
    <div className="descriptionText">
      <h3>{currentItem.slogan}</h3>
      <p>{currentItem.description}</p>
    </div>
  );
};

export default DescriptionText;
