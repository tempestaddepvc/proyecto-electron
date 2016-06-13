import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import IconButton from 'material-ui/IconButton';
import {red500} from 'material-ui/styles/colors';
import FullRecipeDialog from './FullRecipeDialog';
import axios from "../actions/axiosConfig";
import RecipesStore from "../stores/RecipesStore";
import * as RecipesActions from "../actions/RecipesActions";
export default class Recipe extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      recipeInformation: {}
    }
    };
    componentWillMount() {
      RecipesStore.on("fetchedRecipe", () => this.onRecipeFetched());

    };
    componentWillUnmount() {
    RecipesStore.removeListener("fetchedRecipe", this.onRecipeFetched);
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
  handleOpen = () => {
    console.log("Este es el iderecipe"+ this.props.iderecipe)
    RecipesActions.fetchOneRecipe(this.props.idrecipe);
  };
  handleClose = () => {
    this.setState({open: false});
  };
render(){
  const styleCard = {
   height:'320px',
   width:'300px',
   marginBottom:'20px',

  }
  const styleContent={
    fontSize:'75%',
    fontWeight:'bold',
    height: '20px',
    marginTop: '-20px'
  }
  const styleOverlay={
    height:'20px',

    opacity: 0.4
  }
  const imageStyle={
    maxWidth:'230px',
    maxHeight:'95px',
    overflow:'hidden'
  }
  const divStyle={
    position: 'relative'
  }

  return(
    <div>
    <Card style={styleCard} >
    <CardMedia style={this.imageStyle}
      overlay={   <CardTitle    title={this.props.name} titleStyle={styleContent}/>}
      overlayContainerStyle={this.styleOverlay} overlayStyle={this.styleOverlay}
    >
      <img src={this.props.picture} style={this.imageStyle}/>
    </CardMedia>
    <CardText>
      <p>{this.props.details}</p>

    <div style={this.divStyle}>
      <a style={ {float: 'left'}}>{this.props.time} min</a><a style={{float:'right',fontColor:'green'}}>{this.props.difficulty}</a><br/>
      <IconButton  onTouchTap={this.handleOpen.bind(this)} style={{position:'relative',bottom:'10px'}}>
        <ActionFavorite  color={red500}/>
      </IconButton >
      </div>
    </CardText>

  </Card>
 <FullRecipeDialog recipeInformation={this.state.recipeInformation} handleClose={this.handleClose.bind(this)} isOpen={this.state.open}/>
 </div>
  )
}

}
