// always import React and the other components that the pages will reference or use.
import React from 'react';
// if using {} during import, that is a named import
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker.js';
import App from './App.js';
import NotFound from './NotFound.js';


// no router available so need to create it from scratch, follow this sequence.
// first the correct path and the component used
// then the alternate ones with their respective path
// last the 404 page with the component (no path in this one)
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>

  )

// remember to export the prop
export default Router;
