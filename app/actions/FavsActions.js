import dispatcher from "../dispatcher";
import axios from "./axiosConfig";
import querystring  from 'querystring';

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
