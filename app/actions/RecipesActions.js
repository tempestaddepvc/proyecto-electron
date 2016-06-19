import dispatcher from "../dispatcher";
import axios from "./axiosConfig";
import querystring  from 'querystring';
import UserStore from '../stores/UserStore';
//...
export function getAllRecipes(){
  axios.get('/recipes').then(function (response){
    dispatcher.dispatch({
      type: 'RECEIVE_RECIPES',
      recipes:response.data.message,
    }
    );
  }).catch(function (response) {
    console.log('problemitas');
    console.log(response);
    dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching recipes'});
  });

}
export function getMyRecipes(){
  axios.get('/recipes/user/'+ UserStore.getUsername()).then(function (response){
    dispatcher.dispatch({
      type: 'RECEIVE_RECIPES',
      recipes:response.data.message,
    }
    );
  }).catch(function (response) {
    console.log('problemitas');
    console.log(response);
    dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching recipes'});
  });

}
export function getMyFavs(){
  axios.get('/favs/user/'+ UserStore.getUsername()).then(function (response){
    dispatcher.dispatch({
      type: 'RECEIVE_RECIPES',
      recipes:response.data.message,
    }
    );
  }).catch(function (response) {
    console.log('problemitas');
    console.log(response);
    dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching recipes'});
  });
}
  export function getMyRecipesAndFavs(){
    axios.get('/createdandfav/user/'+ UserStore.getUsername()).then(function (response){
      dispatcher.dispatch({
        type: 'RECEIVE_RECIPES',
        recipes:response.data.message,
      }
      );
    }).catch(function (response) {
      console.log('problemitas');
      console.log(response);
      dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching recipes'});
    });
}
export function searchByName(name){
  axios.get('/filter/'+ name).then(function (response){
    console.log('La búsqueda en sí misma');
    console.log(response);
    dispatcher.dispatch({
      type: 'RECEIVE_RECIPES',
      recipes:response.data.message,
    }
    );
  }).catch(function (response) {
    console.log('problemitas');
    console.log(response);
    dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching recipes'});
  });
}

export function fetchOneRecipe(idrecipe){
  axios.get('/recipes/'+ idrecipe).then(function (response){
    console.log("Fecth one recipe log")
  console.log(response);
  dispatcher.dispatch({type:'FETCH_ONE_RECIPE',recipe:response.data.message[0]});

  }).catch(function (response) {
    console.log(response);
  dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching the recipe'});
  });
}
