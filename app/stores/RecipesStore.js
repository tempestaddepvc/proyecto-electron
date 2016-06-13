import {EventEmitter} from "events";
import dispatcher from "../dispatcher"
class RecipesStore extends EventEmitter{
  constructor(){
    super();

  }


  getAll(){

    return this.recipes;
  }
  getFullRecipe(){
    return this.completeRecipe;
  }
  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_RECIPES": {
        console.log("Las recetas que le lleguen al store")
        console.log(action.recipes);
        this.recipes=action.recipes;
        this.emit('change');
        break;
      }
        case "FETCH_ONE_RECIPE": {
          console.log("La recetacompleta en el store")
          console.log(action.recipe);
          this.completeRecipe=action.recipe;
          this.emit('fetchedRecipe');
          break;
        }

}
}
}
const  recipesStore= new RecipesStore;
dispatcher.register(recipesStore.handleActions.bind(recipesStore));
export default recipesStore;
