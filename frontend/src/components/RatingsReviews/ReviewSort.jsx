import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';


const ReviewSort = () => {

  const {totalReviews, setSortOn} = useContext(ReviewContext);


  //onChange event handler
  const onChangeSortEventHandler = (event) => {
    setSortOn(event.target.value);
  };



  return (
    <div className="reviewSort">

      {totalReviews} reviews, sorted by
      <select className="reviewSortBtn" onChange={(event) => { onChangeSortEventHandler(event) }}>
        <option value="relevant" >relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>

    </div>
  );
};

export default ReviewSort;
