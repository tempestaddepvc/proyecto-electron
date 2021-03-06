import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';


export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state={
      imagePreviewUrl: '',

    }
  };
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

     });
   }

   reader.readAsDataURL(file)
 }
  handleRemove(){
    this.props.deleteStepInput(this.props.id);
  }
  render() {


    return (
      <div>
        <Paper style={{position:'relative',height:'100px',marginBottom:'20px',maxWidth:'80%'}}>
  
              <TextField
              ref='step'
                hintText="Step"
                floatingLabelText="Step"
                maxLength="45"
              />


</Paper>
<IconButton onTouchTap={this.handleRemove.bind(this)}><NavigationClose /></IconButton>

</div>
    );
  }
}
