import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';

const DescriptionCheckboxes = () => {
  const { currentItem } = useContext(GlobalContext);
  if(currentItem.features === undefined) {
    return (<span>Loading...</span>)
  } else {
  return (
    <div className="checkBoxesText">
      {currentItem.features.map((element, index) => (
        <li key={index} style={{"listStyleType": "none"}}>{'✓  ' + element.value}</li>
  ))}

    </div>
  );
};
}
export default DescriptionCheckboxes;
