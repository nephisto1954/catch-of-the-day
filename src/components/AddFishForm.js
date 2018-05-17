// always import React and the other components that the pages will reference or use.
import React from 'react';
// for data validation
import PropTypes from "prop-types";

// when using data that may change you need to use this form of props class.
// the description is a texarea tags
// the dropdown is done using the select and options tags
class AddFishForm extends React.Component {

  // DATA type Validation. need to be done everytime this.props.something is used!
  static propTypes= {
    addFish: PropTypes.func
  };


  // creates the reference to the input without touching the dom.
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  // event handling!
  createFish = (event) => {
  // 1.stop the form from sumitting
  event.preventDefault();

  // create a const that will be updated when the submit is clicked.
  // console.log this, then nameRef, then current, then value
  // parseFloat makes sure its a float and not a string
  const fish = {
  name: this.nameRef.current.value,
  price: parseFloat(this.priceRef.current.value),
  status: this.statusRef.current.value,
  desc: this.descRef.current.value,
  image: this.imageRef.current.value
  };
  // console.log(fish) to confirm the results

  this.props.addFish(fish);
  // this will access addFish from App.js

  //refresh the form after been used. console.log(event.currentTarget);
  event.currentTarget.reset();
};

  // render a form with the different inputs and the respective refs using 'this.'
  render () {
    return (
    <form className="fish-edit" onSubmit={this.createFish}>
      <input name="name" ref={this.nameRef}type="text" placeholder="Name"/>
      <input name="price" ref={this.priceRef}type="text" placeholder="Price"/>
      <select name="status"ref={this.statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" ref={this.descRef}placeholder="Desc"></textarea>
      <input name="image" ref={this.imageRef}type="text" placeholder="Image"/>
      <button className="submit">+ Add Fish</button>
    </form>
    );
  }
}

// remember to export the prop
export default AddFishForm;
