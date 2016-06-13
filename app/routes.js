import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import RecipesPage from './containers/RecipesPage';
import LoginPage from './containers/LoginPage'
import SearchByName from './components/SearchByName'
import SearchByIngredients from './components/SearchByIngredients'
export default (
  <Route path="/" component={App}>
  <IndexRoute component={LoginPage}/>
    <Route path="recipes" component={RecipesPage} />
    <Route path="searchByName" component={SearchByName} />
  </Route>
);
