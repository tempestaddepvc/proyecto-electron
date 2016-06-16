import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import IconButSton from 'material-ui/IconButton';
import {red500,green500,yellow500} from 'material-ui/styles/colors';
import axios from "../actions/axiosConfig";
import * as RecipesActions from "../actions/RecipesActions";
import Difficulty from './Difficulty';
import FavoriteIcon from './FavoriteIcon'
export default class Recipe extends React.Component{
  constructor(props) {
    super(props);
    };
    handleOpen = () => {
      console.log("Este es el iderecipe"+ this.props.iderecipe)
      RecipesActions.fetchOneRecipe(this.props.idrecipe);
    };

render(){
  const styleCard = {
   height:'320px',
   width:'300px',
   marginBottom:'20px',
   cursor:'pointer'
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
    <Card style={styleCard} onClick={this.handleOpen.bind(this)}>
    <CardMedia style={this.imageStyle}
      overlay={   <CardTitle    title={this.props.name} titleStyle={styleContent}/>}
      overlayContainerStyle={this.styleOverlay} overlayStyle={this.styleOverlay}
    >
      <img src={this.props.picture} style={this.imageStyle}/>
    </CardMedia>
    <CardText>
      <p>{this.props.details}</p>

    <div style={this.divStyle}>
      <a style={ {float: 'left'}}>{this.props.time} min</a><div style={{float:'right'}}><Difficulty valor={this.props.difficulty}/></div>
      <FavoriteIcon  color={red500} idrecipe={this.props.idrecipe}   />

      </div>
    </CardText>

  </Card>

 </div>
  )
}

}
