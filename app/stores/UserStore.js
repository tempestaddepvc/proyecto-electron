import {EventEmitter} from "events";
import dispatcher from "../dispatcher"
class UserStore extends EventEmitter{
  constructor(){
    super();

  }


  getUsername(){
    return this.username;
  }
  getApiKey(){
    return this.apiKey;
  }
  handleActions(action) {
    switch(action.type) {
      case "LOG_IN": {
        this.apiKey=action.usuario.apiKey;
        this.username=action.usuario.user;
        this.emit('change');
        break;
      }
      case "LOG_OUT": {
        this.apiKey=undefined;
        this.username=undefined;
        this.emit('change');
        break;
      }
    }

}
}
const  userStore= new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));
export default userStore;
