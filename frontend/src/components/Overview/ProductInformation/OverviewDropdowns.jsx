import React, {useContext} from 'react';
import GlobalContext from '../../../Contexts/index.jsx';

const OverviewDropdowns = () => {
  const {currentItem} = useContext(GlobalContext);

  return (
    <div>
      OverviewDropdowns
    </div>
  );
};

export default OverviewDropdowns;