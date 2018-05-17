// all pages need to import React, also import all components that are referenced in the page
import React from "react";
// for data validation
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {

  // DATA type Validation. need to be done everytime this.props.something is used!
  static propTypes = {
    history: PropTypes.object
  }

  // creates a const with a Ref which is used to get info from the Dom
  myInput = React.createRef();

  // function that takes an event and prevent reloading page and get the input value and redirect to correct url
  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const storeName = this.myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      // onSubmit will call the function created above
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          // allow access to the input without touching the DOM
          ref={this.myInput}
          required
          placeholder="Store Name"
          // set the a dynamic value using a function in the helper.js
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

// dont forget to export the prop
export default StorePicker;
