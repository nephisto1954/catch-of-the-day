// always import React and the other components that the pages will reference or use.
import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router.js'
import './css/style.css';


// import to render the page using the router which will reference the other comnponents indirectly
// and get a queryselector to target the only/main element in the dom to which we will inject information.
render(<Router />, document.querySelector('#main'));
