import React from 'react';
import Recipe from '../components/Recipe'
import RecipesStore from "../stores/RecipesStore";
import FullRecipeDialog from '../components/FullRecipeDialog';
export default class RecipesPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      recipes: [

      ],
      open:false,
      recipeInformation: {}
    };
  };
  componentWillMount() {
    RecipesStore.on("change", () => this.onRecipesChange());
      RecipesStore.on("fetchedRecipe", () => this.onRecipeFetched());
  };
  componentWillUnmount() {
  RecipesStore.removeListener("change", this.onRecipesChange);
    RecipesStore.removeListener("fetchedRecipe", this.onRecipeFetched);
}
  onRecipesChange(){

    this.setState({
      recipes: RecipesStore.getAll(),
    });
  }
  onRecipeFetched(){
    var fullrecipe;
    console.log('Got full recipe');
    console.log(RecipesStore.getFullRecipe());
    fullrecipe= RecipesStore.getFullRecipe();
    this.setState({open: true,recipeInformation: fullrecipe });
    console.log("Esto es lo que llega a recipe");
    console.log(this.state.recipeInformation);
  }

 handleClose = () => {
   this.setState({open: false});
 };
render(){
  const styleDiv = {
   textAlign: 'center',
   marginTop: '10px',
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-between',
   alignItems: 'center',
  }
  const { recipes } = this.state;
    const RecipeComponents = recipes.map((recipe) => {
            return <Recipe key={recipe.idrecipe} {...recipe} />;
        });

console.log(RecipeComponents);
  return(
    <div style={styleDiv}>
    {RecipeComponents}
    <FullRecipeDialog recipeInformation={this.state.recipeInformation} handleClose={this.handleClose.bind(this)} isOpen={this.state.open}/>
  </div>
  )
}

}
