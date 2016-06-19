import React from 'react';
import axios from "axios";
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
import InputQuantity from "./InputQuantity"
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import InputSteps from './InputSteps'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import querystring  from 'querystring';
import UserStore from '../stores/UserStore';
const muiTheme = getMuiTheme();
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class NewRecipeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   file: 'a',
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
  axios.get('http://52.31.144.145/api/v1/ingredients').then(function (response){
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
    uploadRecipe(){
      var json = {};
      json.name=this.refs.name.getValue();
      json.details=this.refs.details.getValue();
      json.time=Number(this.refs.time.getValue());
      json.diners=Number(this.refs.diners.getValue());
      json.difficulty=this.state.value;
      json.quantities=[];
      json.steps=[];
      console.log(this.refs)

      if (this.state.file=='a') {
    json.picture="";
}else{
  var data = new FormData();
  data.append('image',this.state.file)
      axios.post('https://api.imgur.com/3/image',data,{
        headers:{
          authorization:"Client-ID 78af42f7d86086c"
        }
      }
      ).then(function(response){
        json.picture=(response.data.data.link);
      }).catch(function(response){
        console.log(response);

      })
      }
      for (let component of Object.keys(this.refs).map(key => this.refs[key])) {
        if(Object.getPrototypeOf(component) == InputQuantity.prototype){
          json.quantities.push({
            name:component.refs.name.getValue(),
            cant:component.refs.cant.getValue(),
            measure:component.refs.measure.getValue(),
          })
        } else if(Object.getPrototypeOf(component) == InputSteps.prototype){
          console.log("La picture");
          console.log(component.state.file);
          if (typeof component.state.file === 'undefined' || component.state.file === null) {
            console.log("La picture");
            console.log(component.state.file)
            json.steps.push({
              step: component.refs.step.getValue(),
              picture:""
            })

    }
    else{
      var data = new FormData();
      data.append('image',component.state.file)
          axios.post('https://api.imgur.com/3/image',data,{
            headers:{
              authorization:"Client-ID 78af42f7d86086c"
            }
          }
          ).then(function(response){
            json.steps.push({
              step: component.refs.step.getValue(),
              picture:response.data.data.link
            })
          }).catch(function(response){
            console.log(response);

          })
        }
        }
      }
      var self=this;
      setTimeout(function(){
        console.log(JSON.stringify(json));

        axios.post('http://52.31.144.145/api/v1/recipes',querystring.stringify( {
          recipe: JSON.stringify(json),
        }),{
          headers:{
            authorization:UserStore.getApiKey()
          }
        }
        ).then(function(response){
          console.log('FUNSIONA WEON')
                self.handleClose();
        }).catch(function(response){

          console.log('Casi funciona el createRecipe,pero no');
          console.log(response);

        })

      }, 1500);

    }
    handleClose(){
      this.props.handleClose();


        this.state = {
       file: 'a',
       imagePreviewUrl: '',
       value: 1,
       allIngredients: [],
       quantities: "",
       steps: "",

    }
    this.state = {
   file: 'a',
   imagePreviewUrl: '',
   value: 1,
   allIngredients: [],
   quantities: [0],
   steps: [0],

}
}

  render() {
    const    inputsQuantities=this.state.quantities.map(quantity => <InputQuantity key={quantity} id={quantity} ref={'quantity'+quantity}  deleteQuantityInput={this.deleteQuantityInput.bind(this)} allIngredients={this.state.allIngredients}/>)
    const    inputsSteps=this.state.steps.map(step => <InputSteps key={step} id={step} ref={'step'+ step} deleteStepInput={this.deleteStepInput.bind(this)}/>)
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
    <IconButton onTouchTap={this.handleClose.bind(this)}><NavigationClose /></IconButton>
  }
/>
<div style={{
  textAlign:'center',
}}>
<TextField style={{
   marginTop: '40px',

}}
ref='name'
maxLength="45"
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
maxLength="45"
  hintText="Recipe description"
  floatingLabelText="Recipe description"
/>
</div>
  <div style={styleDiv}>
  <TextField
  ref='time'
  type='number'
  maxLength="10"
    hintText="Time(in minutes)"
    floatingLabelText="Time(in minutes)"
    inputStyle={{
      textAlign: 'right'
    }}
    style={{
      width: '125px',
    }}
  />
  <SelectField ref='difficulty' value={this.state.value} onChange={this.handleChange} floatingLabelText='Difficulty' style={{
    width: '125px',
  }}>
  <MenuItem value={0}  primaryText="Easy" />
  <MenuItem value={1}  primaryText="Medium" />
  <MenuItem value={2}  primaryText="Hard" />
  </SelectField>
  <TextField
  ref='diners'
  type='number'
  maxLength="10"
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
    <br/>
    <div style={{textAlign:"center"}}>
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.uploadRecipe.bind(this)}

    />
    </div>
        </Dialog>

    );
  }
}
