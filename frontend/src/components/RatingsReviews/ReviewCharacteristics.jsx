import React, {useState} from 'react';


const ReviewCharacteristics = (props) => {

  // create an array to store characteristics
  let characteristicsList = [];

  // turn the characteristics object into an array of React elements
  for (let key in props.characteristics) {
    characteristicsList.push(
      (<div key={key}>
        <div>{key}</div>
        <div>{Number(props.characteristics[key].value).toFixed(1) || 0}</div>
      </div>)
    );
  }



  return (
    <div className="reviewCharacteristics">
      {characteristicsList}
    </div>
  );
};

export default ReviewCharacteristics;
