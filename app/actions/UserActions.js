import dispatcher from "../dispatcher";
import axios from "axios";
import querystring  from 'querystring';
//...
export function logIn(user,password){
  dispatcher.dispatch({type: 'STARTING_LOGIN_REGISTER'});
  axios.post('http://52.31.144.145/api/v1/login',querystring.stringify( {
    user: user,
    password: password
  }))
  .then(function (response) {
    if(response.data.error='false'){
      if(response.data.message==1 || response.data.message==2){
        alert("Incorrect credentials");
      }else{
        console.log("log in succesful")
        dispatcher.dispatch({type: 'LOG_IN',usuario:{
          user: user,
          apiKey: response.data.message
        }});
      }

    }
    else{
      alert(response.data.message);
    }
  })
  .catch(function (response) {
    alert(response.data.message);
  });
}
export function register(user,password){
  dispatcher.dispatch({type: 'STARTING_LOGIN_REGISTER'});
  axios.post('http://52.31.144.145/api/v1/register',querystring.stringify( {
    user: user,
    password: password
  }))
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
}
