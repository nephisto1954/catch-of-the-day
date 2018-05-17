// always import React and the other components that the pages will reference or use.
import React from 'react';
// for data validation
import PropTypes from "prop-types";
import { formatPrice } from '../helpers.js';
// this will load the transition from a react package.
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Order extends React.Component {

  // DATA type Validation. need to be done everytime this.props.something is used!
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    deleteOrder: PropTypes.func
  };


  // created a separate segment to be injected into the orderIds.map but key => {<li>{key}</li>}
  // could also be injected directly instead of this.renderOrder
  renderOrder = key => {
    // You need to declare the fish and order variable you got from App.js
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    // need to have a way to handle if the fish is no longer available.
    const isAvailable = fish && fish.status === 'available';
    // below is transition options you want to pass several times to CSSTransition.
    const transitionOptions = {
      key,
      classNames: "order",
      timeout: {enter: 500, exit: 500}
    };
    // this below will make sure that when the page loads the localStorage in App.js has time to let Firebase sync the fishes.
    if (!fish) return null;
    // if the fish has a name, show it if unavailable otherwise show 'fish'.
    // if available addup price. Dont forget to return otherwise wont work.
    // remember to assign a key/id to each list items
    if (!isAvailable){
      // we are adding the CSSTransition to the li and TransitionGroup to the ul.
      // CSSTransition take classNames, key, timeout.
      return (
        <CSSTransition {...transitionOptions}
        >
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );
    }

    // we are adding the CSSTransition to the li and TransitionGroup to the ul.
    // CSSTransition take classNames, key, timeout.
    // for animation purposes, need to put the {count} in a <span> tag.
    // the key={count} in the CSSTransition will make two span that will animate on transition.
    return (
      <CSSTransition{...transitionOptions}
      >
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
              classNames="count"
              key={count}
              timeout={{ enter: 500, exit: 500}}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  // added above a button to remove the fish from an order using the deleteOrder method in App.js
  // &times; ---> gives you a x button symbol

  // need to tally up the total order
  render () {
    // get the id/key for for each order
    const orderIds = Object.keys(this.props.order);
    // add-up all of it. reduce needs too arguments: the total upto now + the last item/key
    // and an arrow function. You need to declare the fish and order variable you got from App.js
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      // below is for the case where we run out of fish
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        // this will addup all the prices
        return prevTotal + (count * fish.price);
      }
      // otherwise use the total upto now
      return prevTotal;
      // the 0 below is the starting point. needed in a reduce function
    },0);


    // need to loop over the orders to be able to display them on the order part of the page.
    // and transform them into list items.
    // TransitionGroup tag is the same as UL tag with animation.
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  };
};
// use the helper method to format the price correctly. wrap it around the total const


// remember to export the prop
export default Order;
