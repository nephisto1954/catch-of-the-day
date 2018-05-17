// always import React and the other components that the pages will reference or use.
import React from 'react';
// for data validation
import PropTypes from "prop-types";
// link the firebase file
import base from '../base.js';
import Header from './Header.js';
import Order from './Order.js';
import Inventory from './Inventory.js';
import sampleFishes from '../sample-fishes.js';
import Fish from './Fish.js';


// statefull props with the sibling components which compose the page.
class App extends React.Component {

  // DATA type Validation. need to be done everytime this.props.something is used!
  static propTypes = {
    match: PropTypes.object
  };


// --------- State ------------

  // need to set the initial state using a property
  state = {
  fishes: {},
  order: {}
  };

// --------- Life Cycle --------

  // on load feature
  componentDidMount() {
    // console.log('Mounted!'); to test.
    // this is the path to the store id.
    const { params } = this.props.match;
    // 1. reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    // console.log(localStorageRef);
    // IMPORTANT to JSON.parse(localStorageRef) to make it back into an object from a string
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)})
    }
    // ref here represent a reference to a piece of database.
    // this `${params.storeId}/fishes` targets the fishes of each store.
    // the {} here are for options to pass to syncState.
    // this will PERSIST data.
    this.ref= base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  };


  // will update the local storage so that the order stays on the page even if you reload.
  componentDidUpdate() {
    // console.log('It updated');
    // console.log(this.state.order);
    // console.log(this.props.match.params.storeId);

    // in parenthese (key, value).
    // IMPORTANT! Value need to be wrapped in JSON.stringify otherwise will show [object Object]. reverse of JSON.parse
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  };



  // this is for when you leave the page, makes sure no memory overflow happens
  componentWillUnmount() {
    // console.log('Unmounted');
    base.removeBinding(this.ref);
  };

// --------- Custom properties/function ----------

  //  HERE IS WHERE YOU CRUD
  // ---------------------------------------------

  // ----------- C -------------
  // Every custom function that update the states needs to be in the same page as the state
  // below is an exemple of that.
  addFish = fish => {
  // there is two steps to update a state
  // 1. take a copy of the existing state (never modify directly the initial state)
  const fishes = {...this.state.fishes};
  // 2. add the new fish to the fishes variable.
  fishes[`fish${Date.now()}`] = fish;
  // this will give a timestamp that is uniq as index (unless you save multiple fish at the same time)

  // 3. Set the new fishes objects as state. it can be all keys/values or just a few or a single one
  this.setState({ fishes });
  // this will update the initial state with the new information.
  // only fishes instead of {fishes: fishes} thanks to ES6

    console.log('Thats a fish');
  };


  // ----------- R --------------
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };


  // ----------- U --------------
  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = {...this.state.fishes};
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes });
    // 4. add it to the inventry in the render method below and in the EditFishForm in inventory.js
    // also in the handleChange function, add this.props.updatedFish(key, updatedFish)
  };

  addToOrder = key => {
  // 1. take a copy of state
  const order = {...this.state.order};
  // 2. either add to the order or update the number of the order.
  // if the order with the specific key is not present then it will display "1",
  // if it is already present it will increment itself.
  order[key] = order[key] + 1 || 1;
  // 3. call setState to update the state.
  this.setState({ order });
  // same as with fishes, thanks to ES6 if both are the using the same key/value, you can write just <one></one>

  // then we need to add the addToOrder to the render below <Fish addToOrder=(this.addToOrder}>
  };


  // ----------- D --------------
  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = {...this.state.fishes};
    // 2. update the state. The null is for Firebase to remove the fish.
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
    // to manually test it, in the React dev tool, search app, then in console type $r, then $r.deleteFish('fish1'), then fish2...
    // then hook it to a button in EditFishForm. Also in the render method below add deleteFish={this.deleteFish} to the inventory tag
    // as well as in the inventory.js so that the function is passed down from the App, to Inventory to EditFishForm.
  };

  deleteOrder = (key) => {
    // 1. take a copy of state
    const order = {...this.state.order};
    // 2. use delete to remove the order.
    delete order[key];
    // 3. update state
    this.setState({ order });
    // to manually test it, in the React dev tool, search app, then in console type $r, then $r.deleteOrder('fish1'), then fish2...
    // then hook it to a button in Fish.js. Also in the render method below add deleteOrder={this.deleteOrder} to the Fish tag
    // as well as in the Fish.js so that the function is passed down from the App, to Fish to Order.
  };


// ------------- Render -----------------

  // in the UL below, jsx cannot do loops so you have to use {} to use Js to loop
  // Object.key will grab the keys from the object state but you have to pass it this.state.fishes so it can find it
  // then you map over each keys.
  // when using loops you need a uniq key attribute to each element --> key={key}
  // The Fish tag will get the data injected by using details={this.state.fishes[key]},
  // this will target each fish in the state and display only the targeted ones.
  // reason why we have key={key} and index={key} is because when using the addToOrder which requires a key,
  // the key={key} is not avaialble to use so you need to set a separate one using index={key} which will be available to use.
  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes)
              .map(key => (
                <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                />))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteOrder={this.deleteOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  };
};
// the addFish on the inventory allows to pass information up and down the app.
// that will make addFish a prop of Inventory. Same for loadSampleFishes and fishes and order.

// remember to export the prop
export default App;
