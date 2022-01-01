import React from 'react';
import {FaCaretDown} from 'react-icons/fa';


const ReviewCharacteristics = (props) => {

  // create an array to store characteristics
  let characteristicsList = [];


  let labels = {
    Size:    {left: 'Too small',     right: 'Too big'},
    Width:   {left: 'Too narrow',    right: 'Too wide'},
    Comfort: {left: 'Uncomfortable', right: 'Perfect'},
    Quality: {left: 'Poor',          right: 'Perfect'},
    Length:  {left: 'Runs short',    right: 'Runs long'},
    Fit:     {left: 'Too tight',     right: 'Too loose'},
  }

  // turn the characteristics object into an array of React elements
  for (let key in props.characteristics) {
    if (props.characteristics[key].value) {
      characteristicsList.push(
        (
          <div className="reviewCharacteristic" key={key}>
            <div>{key}</div>
            {/* <div className="reviewCharacteristicBar">====={props.characteristics[key].value}=====</div> */}
            <div className="reviewCharacteristicBar">
              <div className="reviewCharacteristicBarPortion"></div>
              <div className="reviewCharacteristicBarPortion"></div>
              <div className="reviewCharacteristicBarPortion"></div>
            </div>

            {/* need to figure this out after lunch. need to use a div/span/relative position to position icon properly */}
            <div className="reviewCharacteristicsIconBar">
              <span style={{width: `${props.characteristics[key].value/5}%`}}></span>
              <FaCaretDown className="reviewCharacteristicsIcon"/>
            </div>


            <div className="reviewCharacteristicBottomLabels">
              <div>{labels[key].left}</div>
              <div>{labels[key].right}</div>
            </div>

          </div>
        )
      );
    }
  }

  // render product characteristics if they exist
  return (
    <div className="reviewCharacteristicsList">
      {characteristicsList}
    </div>
  );
};

export default ReviewCharacteristics;

