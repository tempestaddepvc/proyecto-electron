import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage'
export default (
  <Route path="/" component={App}>
  <IndexRoute component={LoginPage}/>
    <Route path="counter" component={CounterPage} />

  </Route>
);
