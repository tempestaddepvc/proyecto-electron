import dispatcher from "../dispatcher";
import axios from "./axiosConfig";
import querystring  from 'querystring';
import * as FavsActions from './FavsActions';




export function logIn(user,password){

  axios.post('/login',querystring.stringify( {
    user: user,
    password: password
  }))
  .then(function (response) {
    if(response.data.error='false'){
      if(response.data.message==1 || response.data.message==2){
        dispatcher.dispatch({type:'MESSAGE',message:'Incorrect credentials'});
      }else{

        dispatcher.dispatch(
          {type: 'LOG_IN',
          usuario:{
          user: user,
          apiKey: response.data.message
        }});
        dispatcher.dispatch({type:'MESSAGE',message:'Log in succesful'});
        FavsActions.getFavorites(user);
      }

    }
    else{
      dispatcher.dispatch({type:'MESSAGE',message:response.data.message});
    }
  })
  .catch(function (response) {
    console.log(response);
    dispatcher.dispatch({type:'MESSAGE',message:response.data.message});
  });
}

export function logOut(){
  dispatcher.dispatch(
    {type: 'LOG_OUT'});
}

export function register(user,password){
  dispatcher.dispatch({type: 'STARTING_LOGIN_REGISTER'});
  axios.post('http://52.31.144.145/api/v1/register',querystring.stringify( {
    user: user,
    password: password
  }))
  .then(function (response) {
    dispatcher.dispatch({type:'MESSAGE',message:"Registering succesful"});


      axios.post('/login',querystring.stringify( {
        user: user,
        password: password
      }))
      .then(function (response) {
        if(response.data.error='false'){
          if(response.data.message==1 || response.data.message==2){
            dispatcher.dispatch({type:'MESSAGE',message:'Incorrect credentials'});
          }else{

            dispatcher.dispatch(
              {type: 'LOG_IN',
              usuario:{
              user: user,
              apiKey: response.data.message
            }});
            FavsActions.getFavorites(user);
          }

        }
        else{
          dispatcher.dispatch({type:'MESSAGE',message:response.data.message});
        }
      })
      .catch(function (response) {
        console.log(response);
        dispatcher.dispatch({type:'MESSAGE',message:response.data.message});
      });
  })
  .catch(function (response) {
    dispatcher.dispatch({type:'MESSAGE',message:response.data.message});
  });
}
