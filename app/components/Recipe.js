import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class Recipe extends React.Component{

render(){
  const styleCard = {
   textAlign: 'center',
   height:'300px',
   width:'300px',
  }
  const styleContent={
 fontSize:'75%',

  }
  const styleOverlay={

  }
  return(
    <Card style={styleCard} zdepth='40'>
    <CardMedia
      overlay={<CardTitle   title="Pato al chilindrón con avellanas frescaslllll" titleStyle={styleContent}/>}
    >
      <img src="http://lorempixel.com/600/337/nature/" />
    </CardMedia>
    <CardText >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
  )
}

}
