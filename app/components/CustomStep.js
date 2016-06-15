import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();

export default class Steps extends Component {
  constructor(props) {
    super(props);
  };
handleTouchButton(){
  console.log(this.props.idmaking);

  this.props.changeStepIndex(this.props.idmaking);
    console.log("hola");
}
  render() {
    return (
        <Paper style={{position:'relative',height:'100px',marginBottom:'20px'}}>
              <div style={{position:'absolute',top:'40px',}}>
              <a style={{
                backgroundColor:muiTheme.palette.primary1Color,
                borderRadius: '50%',
                color:"white",
                padding:'8px',
                marginLeft:'5px',
                textAlign: 'center',
                fontSize:'15px',


              }}>{this.props.idmaking}</a><a style={{paddingLeft:'5px'}}>{this.props.step}</a>
              </div>
              <img src={this.props.picture} style={{
                 maxWidth:'33%',
                 maxHeight:'100%',
                 position: 'absolute',
                 right:'0px',
                 top:'0px'
              }}/>
</Paper>
    );
  }
}
