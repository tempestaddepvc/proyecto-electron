import React, { Component } from 'react';
import styles from './Home.css';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
export default class InputQuantity extends Component {
  constructor(props) {
    super(props);
    this.state={
      quantity:"22",
      measure:"ml",
    }
  };
  handleRemove(){
    console.log(Date.now());
    this.props.deleteQuantityInput(this.props.id);
  }

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
        ref='name'
            floatingLabelText="Ingredient name"
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            dataSource={this.props.allIngredients}
            maxSearchResults={5}

          />
          <TextField
          ref='cant'
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
          <IconButton onTouchTap={this.handleRemove.bind(this)}><NavigationClose /></IconButton>
          </div>
    );
  }
}
