// always import React and the other components that the pages will reference or use.
import React from 'react';
// for data validation
import PropTypes from "prop-types";
import firebase from 'firebase';
import base, { firebaseApp } from '../base.js';
import AddFishForm from './AddFishForm.js';
import EditFishForm from './EditFishForm.js';
import Login from './Login.js';

// when using data that may change you need to use this form of props class.
// it is all about creating components and reusing them letter by injecting them.
// the prop addFish was passed down from app to inventory and is now this.props.addfish.
// if unsure react dev tool, inventory --> can see that it is a prop. Now addFish is part of addFishForm.

// we want to map over the fishes and give them a tag of EditFishForm which reference the key and to check that it worked
// go into the react dev tool and search Edit. You should have all the fish info.
// Remember to add a key={key} to the .map otherwise error in console. also need index={key}
class Inventory extends React.Component {

  // DATA type Validation. need to be done everytime this.props.something is used!
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };


  // This will make sure you stay logged in if you refresh the page
  componentDidMount() {
    // firebase will checked if we are logged in. if true will pass the user to the
    // authHandler method which will check if we are the right user.
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({ user });
      }
    })
  };


  // this will provide info about the user once the popup signing below is completed
  authHandler = async (authData) => {
    // 1. look up the current store in the firebase database.
    // the fetch below will return a promise. await keywork important.
    // to pass the storeId you need to pass it down from App.js in the inventory tag
    const store = await base.fetch(this.props.storeId, { context: this });
    //  2. claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    };
    //  3. set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner  || authData.user.uid
    })
    console.log(authData);
  };

  // need to create the authenticate method to be called below in the <Login> tag.
  authenticate = (provider) => {
    // use alert(provider) if you want to know which button is pressed but make sure you passed in in the method
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    // that will bring the connection to firebase back, same as in base.js
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  };


  // async method needed because we first when to wait for them to log out of firebase
  logout = async () => {
    console.log('Logging out');
    // logging out of firebase
    await firebase.auth().signOut();
    // revert the uid back to null
    this.setState({ uid: null })
  };

  render () {
    // logout button to be used in two cases below. need the logout method which is above
    const logout = <button onClick={this.logout}>Log Out!</button>

    // this below will short circuit the render of the page until the login is succesful!
    // make sure to import firebase too.

    //  1. checked if they are logged in
    if(!this.state.uid){
      return <Login authenticate={this.authenticate}/>
    };

    // 2. checked if there are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      <div>
        <p>Sorry you are not the owner</p>
        {logout}
      </div>
    };

    //  3. they must be the owner
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => <EditFishForm
          key={key}
          index={key}
          fish={this.props.fishes[key]}
          updateFish={this.props.updateFish}
          deleteFish={this.props.deleteFish}
          />)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}
// addFish and loadSampleFishes are event handling function that have to defined in App.js where the state is



// remember to export the prop
export default Inventory;
