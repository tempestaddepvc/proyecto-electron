import React, { Component } from 'react';
import styles from './Home.css';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
export default class InputQuantity extends Component {
  render() {
    const styleDiv = {
     textAlign: 'center',
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     alignItems: 'center',
    }
    return (
       <div style={styleDiv}>
        <AutoComplete
            floatingLabelText="Ingredient name"
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            dataSource={this.props.allIngredients}
            maxSearchResults={5}

          />
          <TextField
          ref='quantity'
          type='number'
            hintText="Quantity"
            floatingLabelText="Quantity"
            inputStyle={{
              textAlign: 'right'
            }}
            style={{
              width: '80px',
            }}
          />
          <TextField
          ref='measure'
            hintText="Measure"
            floatingLabelText="Measure"
            style={{
              width: '80px',
            }}
          />
          </div>
    );
  }
}
