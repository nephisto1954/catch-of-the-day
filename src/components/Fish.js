// always import React and the other components that the pages will reference or use.
import React from 'react';
import { formatPrice } from '../helpers.js';
// for data validation
import PropTypes from "prop-types";

class Fish extends React.Component {

// setting the requirements!
// DATA type Validation. need to be done everytime this.props.something is used!
// PropTypes.shape is good for objects with different input types
static propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }),
  addToOrder: PropTypes.func
};


// cannot use the key as per message in app.js, need to use the index that we set on purpose for it
handleClick = () => {
  this.props.addToOrder(this.props.index);
};

  render () {
    // this is ES6 destructuring: will extract from this.props.details the info related to image, name...
    // now can use {image} instead of {this.props.details.image}, same for the other ones.
    // to make the price formated correctly, use the formatPrice function from Helpers.js and wrap it around price.
    const {image, name, desc, status, price} = this.props.details;

    // boolean checking if the fish status says available. Useful for menu and order.
    const isAvailable = status === 'available';
    // when added to the button --> disabled if {available === false}


    return (
      <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? 'Add to Order' : 'Sold Out!'}
        </button>
      </li>
    );
  };
};
// the img tag above is using the info from the props given by the App.js UL and LI (where details attributes is)




// remember to export the prop
export default Fish;
