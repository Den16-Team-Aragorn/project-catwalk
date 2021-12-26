/* eslint-disable import/extensions */
import React from 'react';
import Header from './Header/Header.jsx';
import OverviewParent from './Overview/OverviewParent.jsx';
import Related from './RelatedItems/Related.jsx';
import ReviewParent from './RatingsReviews/ReviewParent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <OverviewParent />
        <Related />
        <ReviewParent />
      </div>
    );
  }
}

export default App;
