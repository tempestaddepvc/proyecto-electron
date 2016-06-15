import {EventEmitter} from "events";
import dispatcher from "../dispatcher"
class FavsStore extends EventEmitter{
  constructor(){
    super();
    this.favs=[]

  }


  getFavs(){
    return this.favs;
  }
  handleActions(action) {
    switch(action.type) {
      case "USER_FAVORITES": {
        this.favs=action.favs;
        console.log("Los favoritos llegan al store")
        this.emit('change');
        break;
      }

    }

}
}
const  favsStore= new FavsStore;
dispatcher.register(favsStore.handleActions.bind(favsStore));
export default favsStore;
