import React, { Component } from 'react';
import {red500,green500,yellow700} from 'material-ui/styles/colors';


export default class Difficulty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor : 'dificultad',
      color :red500,

    };
  };


componentWillMount = () =>{

  console.log(this.props.valor);
  switch (this.props.valor) {
    case 0:
    this.state =( {
      valor: 'Easy',
      color: green500,
    });
      break;
      case 1:
      console.log('El valor es 1')
      console.log(this);
      this.state =( {
        valor: 'Medium',
        color: yellow700,
      });
        break;
        case 2:
        this.state =( {
          valor: 'Hard',
          color: red500,
        });
          break;
    default:
    this.State =( {
      valor: 'default',
      color: 'Green',
    });

  }
}
  render() {

    return (
      <div style={{color: this.state.color}}>
        {this.state.valor}
      </div>
    );
  }
}
