import React from 'react';
import Recipe from '../components/Recipe'
import RecipesStore from "../stores/RecipesStore";
export default class RecipesPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      recipes: [

      ]
    };
  };
  componentWillMount() {
    RecipesStore.on("change", () => this.onRecipesChange());
  };
  componentWillUnmount() {
  RecipesStore.removeListener("change", this.onRecipesChange);
}
  onRecipesChange(){

    this.setState({
      recipes: RecipesStore.getAll(),
    });
  }
render(){
  const styleDiv = {
   textAlign: 'center',
   marginTop: '20px',
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-between',
   alignItems: 'center',
  }
  const { recipes } = this.state;
    const RecipeComponents = recipes.map((recipe) => {
            return <Recipe key={recipe.idrecipe} {...recipe}/>;
        });

console.log(RecipeComponents);
  return(
    <div style={styleDiv}>
    {RecipeComponents}
  </div>
  )
}

}
