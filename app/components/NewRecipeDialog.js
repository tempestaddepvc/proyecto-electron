import React from 'react';
import Dialog from 'material-ui/Dialog';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider'
import Steps from './Steps'
import FavoriteIcon from './FavoriteIcon'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from "../actions/axiosConfig";
import InputQuantity from "./InputQuantity"
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import InputSteps from './InputSteps'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const muiTheme = getMuiTheme();
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class NewRecipeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   file: '',
   imagePreviewUrl: '',
   value: 1,
   allIngredients: [],
   quantities: [0],
   steps: [0],

 };
  };
  updateAllIngredients = (ingredients) => {
    for (let ingredient of ingredients) {
        this.state.allIngredients.push(ingredient.name)
    }
    console.log(this.state.allIngredients);
  };
componentWillMount(){
  var self=this;
  axios.get('/ingredients').then(function (response){
    console.log("Ingredientes");
    console.log(response.data.message);
    self.updateAllIngredients(response.data.message);
  }).catch(function (response) {
    console.log('problemitas con los ingredientes');
  });
}

  _handleSubmit(e) {
   e.preventDefault();
   // TODO: do something with -> this.state.file
   console.log('handle uploading-', this.state.file);
 }

 _handleImageChange(e) {
   e.preventDefault();

   let reader = new FileReader();
   let file = e.target.files[0];

   reader.onloadend = () => {
     this.setState({
       file: file,
       imagePreviewUrl: reader.result
     });
   }

   reader.readAsDataURL(file)
 }
 handleChange = (event, index, value) => this.setState({value});
 appendQuantityInput() {
      this.setState({ quantities: this.state.quantities.concat([Date.now()]) });
  }
  deleteQuantityInput(number){
    var index=this.state.quantities.indexOf(number);
    this.state.quantities.splice(index,1);
    this.setState({
      quantities:this.state.quantities
    })
    console.log("Quantities despues de eliminar");
    console.log(this.state.quantities);
  }
  appendStepInput() {
        this.setState({ steps: this.state.steps.concat([Date.now()]) });
    }
    deleteStepInput(number){
      var index=this.state.steps.indexOf(number);
      this.state.steps.splice(index,1);
      this.setState({
        steps:this.state.steps
      })
      console.log("Steps despues de eliminar");
      console.log(this.state.steps);
    }

  render() {
    const    inputsQuantities=this.state.quantities.map(quantity => <InputQuantity key={quantity} id={quantity} deleteQuantityInput={this.deleteQuantityInput.bind(this)} allIngredients={this.state.allIngredients}/>)
    const    inputsSteps=this.state.steps.map(step => <InputSteps key={step} id={step} deleteStepInput={this.deleteStepInput.bind(this)}/>)
    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose}
          />,
        ];
    let {
   imagePreviewUrl
 } = this.state;
 let $imagePreview = null;
 if (imagePreviewUrl) {
   $imagePreview = (<img src={imagePreviewUrl} style={{
     maxWidth:'100%',
      maxHeight:'100%',
      margin: 'auto',
      display: 'block',
   }}/>);
 } else {
   $imagePreview = (<div >Please select an image for the recipe</div>);
 }
    const styleDiv = {
     textAlign: 'center',
     marginTop: '10px',
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: '10px'
    }

    return (
        <Dialog
          modal={true}
          open={this.props.isOpen}
          autoScrollBodyContent={true}
          actions={actions}
        >
        <AppBar
        style={{
          position:'absolute',
          top: 0,
          left: 0,
        }}
  title={'New Recipe'}
  iconElementLeft={<a></a>}
  iconElementRight={
    <IconButton onTouchTap={this.props.handleClose}><NavigationClose /></IconButton>
  }
/>
<div style={{
  textAlign:'center',
}}>
<TextField style={{
   marginTop: '40px',

}}
ref='name'
  hintText="Recipe name"
  floatingLabelText="Recipe Name"
/>

<div style={{
  marginTop:'20px'
}}>
  <form onSubmit={(e)=>this._handleSubmit(e)}>
    <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
  </form>
  <div className="imgPreview">
    {$imagePreview}
  </div>
  </div>
</div>
<div style={{
  textAlign:'center',
}}>
<TextField style={{
   marginTop: '10px',

}}
ref='details'
  hintText="Recipe description"
  floatingLabelText="Recipe description"
/>
</div>
  <div style={styleDiv}>
  <TextField
  ref='time'
  type='number'
    hintText="Time(in minutes)"
    floatingLabelText="Time(in minutes)"
    inputStyle={{
      textAlign: 'right'
    }}
    style={{
      width: '125px',
    }}
  />
  <SelectField value={this.state.value} onChange={this.handleChange} floatingLabelText='Difficulty' style={{
    width: '125px',
  }}>
  <MenuItem value={0}  primaryText="Easy" />
  <MenuItem value={1}  primaryText="Medium" />
  <MenuItem value={2}  primaryText="Hard" />
  </SelectField>
  <TextField
  ref='diners'
  type='number'
    hintText="Diners number"
    floatingLabelText="Diners number"
    inputStyle={{
      textAlign: 'right'
    }}
    style={{
      width: '125px',
    }}
  />
  </div>
      <h4 style={{textAlign:'center',marginTop:'50px'}}>Ingredients</h4>
        {inputsQuantities}
    <FloatingActionButton mini={true}  onTouchTap={this.appendQuantityInput.bind(this)} style={{
      marginTop:'10px',
      marginBottom:'10px',
      marginLeft:'10px'
    }}>
          <ContentAdd />
        </FloatingActionButton>

  <h4 style={{textAlign:'center'}}>Directions</h4>
      {inputsSteps}
      <FloatingActionButton mini={true}  onTouchTap={this.appendStepInput.bind(this)} style={{
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px'
      }}><ContentAdd />
    </FloatingActionButton>
        </Dialog>

    );
  }
}
