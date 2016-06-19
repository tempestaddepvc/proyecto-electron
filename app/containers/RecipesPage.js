import React from 'react';
import Recipe from '../components/Recipe'
import RecipesStore from "../stores/RecipesStore";
import FullRecipeDialog from '../components/FullRecipeDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewRecipeDialog from '../components/NewRecipeDialog';
import TextField from 'material-ui/TextField';
export default class RecipesPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      recipes: [

      ],
      open:false,
      recipeInformation: {},
      openNewRecipe:false,
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

 handleOpenNewRecipe = () =>{
   this.setState({
     openNewRecipe: true,
   })
 }
 handleCloseNewRecipe = () => {
   this.setState({openNewRecipe: false});
 };

render(){
  const styleDiv = {
   textAlign: 'center',
   marginTop: '10px',
   display: 'flex',
   flexWrap: 'wrap',
   alignItems: 'center',
   marginLeft: '2%'

  }
  const { recipes } = this.state;
    const RecipeComponents = recipes.map((recipe) => {
            return <Recipe key={recipe.idrecipe} {...recipe} />;
        });

  return(
    <div>
    <div style={styleDiv}>
    {RecipeComponents}
    <FullRecipeDialog recipeInformation={this.state.recipeInformation} handleClose={this.handleClose.bind(this)} isOpen={this.state.open}/>

  </div>

  <FloatingActionButton   onTouchTap={this.handleOpenNewRecipe} style={{
    position:'fixed',
    bottom:'4%',
    right: '3%',
  }}>
    <ContentAdd />
  </FloatingActionButton>
  <NewRecipeDialog isOpen={this.state.openNewRecipe} handleClose={this.handleCloseNewRecipe.bind(this)}/>
  </div>
  )
}

}
