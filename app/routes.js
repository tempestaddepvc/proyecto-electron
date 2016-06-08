import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import RecipesPage from './containers/RecipesPage';
import LoginPage from './containers/LoginPage'
export default (
  <Route path="/" component={App}>
  <IndexRoute component={LoginPage}/>
    <Route path="recipes" component={RecipesPage} />

  </Route>
);
