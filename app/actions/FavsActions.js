import dispatcher from "../dispatcher";
import axios from "./axiosConfig";
import querystring  from 'querystring';
import UserStore from '../stores/UserStore'
export function getFavorites(user){
  axios.get('/favs/user/'+user).then(function (response){
    console.log(response)

    var favList=[];
    try {
      for (let recipe of response.data.message) {
          favList.push(recipe.idrecipe)
      }
      }
      catch(err) {

}

    console.log('Lista favoritos')
    console.log(favList);
    dispatcher.dispatch({
      type: 'USER_FAVORITES',
      favs:favList,
    }
    );
  }).catch(function (response) {
    console.log('Problemas con los favoritos');
    console.log(response);
    dispatcher.dispatch({type:'MESSAGE',message:'Problem fetching favorites'});
  });
}
export function createFav(id){
  axios.post('/favs/'+id,{},{
    headers:{
      authorization:UserStore.getApiKey()
    }
  }
  ).then(function(response){
    getFavorites(UserStore.getUsername())
  }).catch(function(response){

    console.log('Casi funciona el createFav,pero no');
    console.log(response);

  })
}
export function deleteFav(id){
  axios.delete('/favs/'+id,{
    headers:{
      authorization:UserStore.getApiKey()
    }
  }
  ).then(function(response){
    getFavorites(UserStore.getUsername())
  }).catch(function(response){

    console.log('Casi funciona el createFav,pero no');
    console.log(response);

  })}
