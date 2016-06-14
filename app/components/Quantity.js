import React, { Component } from 'react';
import {grey300} from 'material-ui/styles/colors';

export default class Quantity extends Component {
  render() {
    return (
      <div style={{backgroundColor:grey300,borderRadius: '10px',padding:'5px'}}>
      {this.props.name}

      {(() => {
            switch (this.props.cant) {
              case 0:   return "";
              default:      return (':'+ this.props.cant +' ');
            }
          })()}




      {this.props.measure}
      </div>
    );
  }
}
