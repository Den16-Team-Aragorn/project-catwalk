import React, {useState, useContext}from 'react';
import GlobalContext from '../../Contexts/index.jsx';
import ReviewContext from '../../Contexts/reviewContext.jsx';
import axios from 'axios';

const ReviewPostForm = (props) => {

  // import state from context
  const {currentItem} = useContext(GlobalContext);
  const {characteristics, fetchProductReviews} = useContext(ReviewContext);

  // create state variables to store form data
  const [overallRating, setOverallRating] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [Size, setSize] = useState(null);
  const [Width, setWidth] = useState(null);
  const [Comfort, setComfort] = useState(null);
  const [Quality, setQuality] = useState(null);
  const [Length, setLength] = useState(null);
  const [Fit, setFit] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState(['', '', '', '', '']);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState([]);


  // create element to display product characteristics
  let characteristicsList = [];

  let labels = {
    Size:    {1: 'A size too small', 2: '1/2 size too small', 3: 'Perfect', 4: '1/2 size too big', 5: 'A size too big'},
    Width:   {1: 'Too narrow', 2: 'Slightly too narrow', 3: 'Perfect', 4: 'Slightly Wide', 5: 'Too wide'},
    Comfort: {1: 'Uncomfortable', 2: 'Slightly uncomfortable', 3: 'Ok', 4: 'Comfortable', 5: 'Perfect'},
    Quality: {1: 'Poor', 2: 'Below Average', 3: 'What I expected', 4: 'Pretty great', 5: 'Perfect'},
    Length:  {1: 'Runs short', 2: 'Runs slightly short', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long'},
    Fit:     {1: 'Runs tight', 2: 'Runs slightly tight', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long'},
  }

  for (let key in characteristics) {
    characteristicsList.push(
      (
        <div key={key}>
          <div>{key}</div>
          <div onChange={ () => {characteristicOnChange(event)}}>
            <input type="radio" id={`${key}1`} name={key} className="reviewPostCharacteristicsItem" value="1"/>{labels[key][1]}
            <input type="radio" id={`${key}2`} name={key} className="reviewPostCharacteristicsItem" value="2"/>{labels[key][2]}
            <input type="radio" id={`${key}3`} name={key} className="reviewPostCharacteristicsItem" value="3"/>{labels[key][3]}
            <input type="radio" id={`${key}4`} name={key} className="reviewPostCharacteristicsItem" value="4"/>{labels[key][4]}
            <input type="radio" id={`${key}5`} name={key} className="reviewPostCharacteristicsItem" value="5"/>{labels[key][5]}
          </div>
        </div>
      )
    )
  }

  // create element to track body length
  let bodyLengthCounter;
  if (body.length < 50) {
    bodyLengthCounter = (<div>Minimum of 50 characters required. {50 - body.length} more characters required.</div>);
  } else {
    bodyLengthCounter = (<div>Minimum length reached.</div>);
  }

  // create an element to display form data errors
  let formErrorsList;
  if (formErrors.length === 0) {
    formErrorsList = (<div></div>);
  } else {
    formErrorsList = formErrors.map( (error) => (
      <div className="reviewPostError" key={error}>{error}</div>
    ));
  }


  // Overall Rating onChange handler
  const overallRatingOnChange = (event) => {
    setOverallRating(event.target.value);
  };

  // recommended onChange handler
  const recommendedOnChange = (event) => {
    if (event.target.value === 'yes') {
      setRecommended(true);
    } else {
      setRecommended(false);
    }
  }

  // characteristic onChange handler
  const characteristicOnChange = (event) => {

    if (event.target.name === 'Size') {
      setSize(event.target.value);
    } else if (event.target.name === 'Width') {
      setWidth(event.target.value);
    } else if (event.target.name === 'Comfort') {
      setComfort(event.target.value);
    } else if (event.target.name === 'Quality') {
      setQuality(event.target.value);
    } else if (event.target.name === 'Length') {
      setLength(event.target.value);
    } else if (event.target.name === 'Fit') {
      setFit(event.target.value);
    } else {
      console.log('quality is not recognized');
    }
  };

  // summary onChange handler
  const summaryOnChange = (event) => {
    setSummary(event.target.value);
  };

  // body onChange handler
  const bodyOnChange = (event) => {
    setBody(event.target.value);
  };

  // photos onChange handler
  const photosOnChange = (event) => {
    let arr = photos.slice();
    arr[event.target.name.slice(-1)] = event.target.value;
    setPhotos(arr);
  };

  // username onChange handler
  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  // email onChange handler
  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  // post review onClick handler
  const handlePost = () => {

    // build an obj from state variables to send in post request
    let requestObj = {};
    requestObj.product_id = currentItem.id;
    requestObj.rating = Number(overallRating);
    requestObj.summary = summary;
    requestObj.body = body;
    requestObj.recommend = recommended;
    requestObj.name = username;
    requestObj.email = email;

    // add review photos if they exist
    let photosArr = [];
    for (let i = 0; i < 5; i++) {
      if (photos[i] !== '') {
        photosArr.push(photos[i]);
      }
    }
    requestObj.photos = photosArr.slice();

    // add object characteristics if they exist
    let characteristicsObj = {};
    let characteristicsStates = {Size, Width, Comfort, Quality, Length, Fit};

    for (let key in characteristicsStates) {
      if (characteristicsStates[key]) {
        characteristicsObj[characteristics[key].id] = Number(characteristicsStates[key]);
      }
    }
    requestObj.characteristics = characteristicsObj;


    // validate form data. if valid, send post request, else display errors
    let formDataValidity = validateFormData();

    if (formDataValidity === true) {

      // send the post request
      axios
        .post('/api/reviews', requestObj)
        .then( (res) => {
          props.setShowModal(false);
          fetchProductReviews();
        })
        .catch( (err) => {
          console.log('there was an error handling your post request');
        })

    } else {
      setFormErrors(formDataValidity);
    }
  };

  // validate all form data
  const validateFormData = () => {

    // create an array to store the list of errors
    let errors = [];

    // go through each form component searching for empty field or error. add error message to errors array if found
    if (overallRating === null) {
      errors.push('You must choose an overall rating.');
    }
    if (recommended === null) {
      errors.push('You must choose whether or not you would recommend this product.');
    }
    if (characteristics.Size && Size === null) {
      errors.push('You must select a Size option.')
    }
    if (characteristics.Width && Width === null) {
      errors.push('You must select a Width option.')
    }
    if (characteristics.Comfort && Comfort === null) {
      errors.push('You must select a Comfort option.')
    }
    if (characteristics.Quality && Quality === null) {
      errors.push('You must select a Quality option.')
    }
    if (characteristics.Length && Length === null) {
      errors.push('You must select a Length option.')
    }
    if (characteristics.Fit && Fit === null) {
      errors.push('You must select a Fit option.')
    }
    if (summary.length <= 0) {
      errors.push('You must include a summary.')
    }
    if (body.length < 50) {
      errors.push('The body of the review must be 50 characters or greater.')
    }
    if (username.length <= 0) {
      errors.push('You must include a username.')
    }
    if (email.length <= 0 || !email.includes('@')) {
      errors.push('You must include a valid email.')
    }

    // if no errors found, return true, else return error list
    if (errors.length === 0) {
      return true;
    } else {
      return errors;
    }
  };



  return (

    <div>
      <div className="reviewPostHeader">
        <div className="reviewPostHeaderTitle">Write Your Review</div>
        <div className="reviewPostHeaderSubtitle">About the <em>{currentItem.name}</em></div>
      </div>

      <div className="reviewPostRatings">
        <div className="reviewPostSectionTitle">Overall Rating</div>
        <div onChange={overallRatingOnChange}>
          <input type="radio" id="reviewForm1Star" name="overallRating" className="reviewPostRatingsItem" value="1"/>1 Star
          <input type="radio" id="reviewForm2Star" name="overallRating" className="reviewPostRatingsItem" value="2"/>2 Star
          <input type="radio" id="reviewForm3Star" name="overallRating" className="reviewPostRatingsItem" value="3"/>3 Star
          <input type="radio" id="reviewForm4Star" name="overallRating" className="reviewPostRatingsItem" value="4"/>4 Star
          <input type="radio" id="reviewForm5Star" name="overallRating" className="reviewPostRatingsItem" value="5"/>5 Star
        </div>
      </div>

      <div className="reviewPostRecommended">
        <div className="reviewPostSectionTitle">Do you recommend this product?</div>
        <div onChange={recommendedOnChange}>
          <input type="radio" id="reviewFormRecYes" name="recommended"className="reviewPostRecommendedItem" value="yes"/>Yes
          <input type="radio" id="reviewFormRecNo" name="recommended" className="reviewPostRecommendedItem" value="no"/>No
        </div>
      </div>

      <div className="reviewPostCharacteristics">
        <div className="reviewPostSectionTitle">Characteristics</div>
        <div>
          {characteristicsList}
        </div>
      </div>

      <div className="reviewPostSummary">
        <div className="reviewPostSectionTitle">Summary</div>
        <input type="text" id="reviewFormSummary" name="summary" value={summary} onChange={summaryOnChange} placeholder="Best purchase ever!" />
      </div>

      <div className="reviewPostBody">
        <div className="reviewPostSectionTitle">Body</div>
        <textarea type="textarea" id="reviewFormBody" name="body" value={body} onChange={bodyOnChange} placeholder="Why did you like the product or not?" />
        {bodyLengthCounter}
      </div>

      <div className="reviewPostPhotos">
        <div className="reviewPostSectionTitle">Photos (optional)</div>
        <div>
          <div>
            <input type="text" id="reviewFormPhoto0" name="photo0" value={photos[0]} onChange={photosOnChange} placeholder="https://cutepuppy@puppies.com" />
          </div>
          <div>
            <input type="text" id="reviewFormPhoto1" name="photo1" value={photos[1]} onChange={photosOnChange} placeholder="https://cutepuppy@puppies.com" />
          </div>
          <div>
            <input type="text" id="reviewFormPhoto2" name="photo2" value={photos[2]} onChange={photosOnChange} placeholder="https://cutepuppy@puppies.com" />
          </div>
          <div>
            <input type="text" id="reviewFormPhoto3" name="photo3" value={photos[3]} onChange={photosOnChange} placeholder="https://cutepuppy@puppies.com" />
          </div>
          <div>
            <input type="text" id="reviewFormPhoto4" name="photo4" value={photos[4]} onChange={photosOnChange} placeholder="https://cutepuppy@puppies.com" />
          </div>
        </div>
      </div>

      <div className="reviewPostUsername">
        <div className="reviewPostSectionTitle">Username</div>
        <input type="text" id="reviewFormUsername" name="username" value={username} onChange={usernameOnChange} placeholder="Example: jackson11!" />
        <div>For privacy reasons, do not use your full name or email address</div>
      </div>

      <div className="reviewPostEmail">
        <div className="reviewPostSectionTitle">Email</div>
        <input type="text" id="reviewFormEmail" name="email" value={email} onChange={emailOnChange} placeholder="Example: jackson11@email.com" />
        <div>For authentication reasons, you will not be emailed</div>
      </div>

      <div className = "reviewPostErrors">
        {formErrorsList}
      </div>

      <div className="reviewPostButtons">
        <button onClick={ () => {props.setShowModal(false)}}>Cancel</button>
        <button onClick={handlePost}>Post Review</button>
      </div>

    </div>
  );

};

export default ReviewPostForm;
