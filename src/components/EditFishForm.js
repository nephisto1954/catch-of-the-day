// always import React and the other components that the pages will reference or use.
import React from 'react';
// for data validation
import PropTypes from "prop-types";

// after creating the Edit component, look in the Inventory.js react dev tool to see if fishes are available to use
// there is only addFish and loadSampleFish so need to go to App.js and
// in <Inventory> we have to add fishes={this.state.fishes}.
// then import in Inventory EditFishForm.
// go to inventory to add a key to the .map otherwise error in console.
// we need to have also an onChange={this.handleChange} in the input so that we can directly modify the info.
// otherwise react doesnt like having a state in an input.

class EditFishForm extends React.Component {

  // DATA type Validation. need to be done everytime this.props.something is used!
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    updateFish: PropTypes.func,
    index: PropTypes.string
  };


  handleChange = (event) => {
    // console.log(event), then console.log(event.currentTarget), then console.log(event.currentTarget.value);
    console.log(event.currentTarget.value);
    // 1. update that fish take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      // the line below with dynamically select the right target. Important to have name='something' in the inputs
      [event.currentTarget.name]: event.currentTarget.value
    };
    // console.log(updatedFish); to test. Now that it recognise the change, go to App.js and add updateFish = () => to the custom functions
    this.props.updateFish(this.props.index, updatedFish);
    // this.props.index is the key above but it is only accessible if you add in the inventory.js in the EditFishForm tag the index={key}
  };

  render () {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

// above you could have done another function like the one with handleChange but in this case it can be done inline instead




// remember to export the prop
export default EditFishForm;
