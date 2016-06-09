import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import IconButton from 'material-ui/IconButton';
import {red500} from 'material-ui/styles/colors';
export default class Recipe extends React.Component{

render(){
  const styleCard = {
   height:'320px',
   width:'300px',

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
    height: '1px',
    width: '1px'
  }
  const divStyle={
    position: 'relative'
  }
  return(
    <div><Card style={styleCard} >
    <CardMedia style={this.imageStyle}
      overlay={   <CardTitle   title="Huevos revueltos" titleStyle={styleContent}/>}
      overlayContainerStyle={this.styleOverlay} overlayStyle={this.styleOverlay}
    >
      <img src="http://i.imgur.com/ZQ5qQco.jpg" />
    </CardMedia>
    <CardText style>
      <p>La mejor receta del puto mundo</p>

    <div style={this.divStyle}>
      <a style={ {float: 'left'}}>25min</a><a style={{float:'right',fontColor:'green'}}>Easy</a><br/>
      <IconButton style={{position:'relative',bottom:'10px'}}>
        <ActionFavorite color={red500}/>
      </IconButton></div>
    </CardText>

  </Card>
  <Card style={styleCard} >
  <CardMedia style={this.imageStyle}
    overlay={   <CardTitle   title="La mejor receta" titleStyle={styleContent}/>}
    overlayContainerStyle={this.styleOverlay} overlayStyle={this.styleOverlay}
  >
    <img src="http://i.imgur.com/n6bF2Vx.jpg" />
  </CardMedia>
  <CardText style>
    <p>UHmmm qué sabrosón</p>

  <div style={this.divStyle}>
    <a style={ {float: 'left'}}>999min</a><a style={{float:'right',color:'red'}}>Hard</a><br/>
    <IconButton style={{position:'relative',bottom:'10px'}}>
      <ActionFavorite color={red500}/>
    </IconButton></div>
  </CardText>

  </Card>

  </div>
  )
}

}
