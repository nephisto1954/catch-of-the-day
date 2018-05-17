// always import React and the other components that the pages will reference or use.
import React from 'react';
// for data validation
import PropTypes from "prop-types";

// stateless props (to be used if no need for the keyword "this"). still takes in a prop
const Header = props => (
    <header className="top">
      <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day</h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
);

// setting the requirements!
Header.propTypes = {
  tagline: PropTypes.string.isRequired
};


// remember to export the prop
export default Header;
