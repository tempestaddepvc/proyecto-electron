import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';


export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state={
      file: '',
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
       file: file,
       imagePreviewUrl: reader.result
     });
   }

   reader.readAsDataURL(file)
 }
  handleRemove(){
    this.props.deleteStepInput(this.props.id);
  }
  render() {

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
       $imagePreview = (<div >Please select an image for the step</div>);
     }
    return (
      <div>
        <Paper style={{position:'relative',height:'100px',marginBottom:'20px',maxWidth:'80%'}}>
              <div >

              <TextField
              ref='step'
                hintText="Step"
                floatingLabelText="Step"

              />

              </div>
              <form onSubmit={(e)=>this._handleSubmit(e)} style={{
                marginTop:'10px'
              }}>
                <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
              </form>
              <div style={{
                 maxWidth:'33%',
                 maxHeight:'100%',
                 position: 'absolute',
                 right:'0px',
                 top:'0px'
              }}>
                {$imagePreview}
              </div>
</Paper>
<IconButton onTouchTap={this.handleRemove.bind(this)}><NavigationClose /></IconButton>

</div>
    );
  }
}
