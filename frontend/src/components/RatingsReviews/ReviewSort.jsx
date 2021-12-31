import React, {useContext} from 'react';
import ReviewContext from '../../Contexts/reviewContext.jsx';


const ReviewSort = () => {

  const {totalReviews} = useContext(ReviewContext);


  //onChange event handler
  const onChangeSortEventHandler = () => {

    console.log(event.target.value);

    // need to implement sort functionality
    // prob use selected value to set state of a parent component which will fetch using state as a parameter in fetch request
  };



  return (
    <div className="reviewSort">

      {totalReviews} reviews, sorted by
      <select onChange={(event) => { onChangeSortEventHandler(event) }}>
        <option value="relevant">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>

    </div>
  );
};

export default ReviewSort;
