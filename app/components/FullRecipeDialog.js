import React from 'react';
import Dialog from 'material-ui/Dialog';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Difficulty from './Difficulty';
import Quantity from './Quantity';
import Divider from 'material-ui/Divider'
import Steps from './Steps'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class FullRecipeDialog extends React.Component {
  constructor(props) {
    super(props);

    };
  render() {
    const styleDiv = {
     textAlign: 'center',
     marginTop: '10px',
     display: 'flex',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: '10px'
    }
    const { quantities } = this.props.recipeInformation;
      const QuantityComponents = quantities.map((quantity) => {
              return <Quantity key={quantity.idingredient} {...quantity} />;
          });

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
  title={this.props.recipeInformation.name}
  iconElementLeft={<a></a>}
  iconElementRight={
    <IconButton onTouchTap={this.props.handleClose}><NavigationClose /></IconButton>
  }
/>
<img  src={this.props.recipeInformation.picture} style={{
  width:'100%',
   height:'100%',
   margin: 'auto',
   display: 'block',
   marginTop: '40px'
}}/>
  <h2 style={{textAlign:'center'}}>{this.props.recipeInformation.details}</h2>
  <div style={styleDiv}>
  <div>{this.props.recipeInformation.time} min</div>
  <Difficulty valor={this.props.recipeInformation.difficulty}/>
  <div>{this.props.recipeInformation.diners}
  {(() => {
        switch (this.props.recipeInformation.diners) {
          case 1:   return " diner";
          default:      return " diners";
        }
      })()}</div>
  </div>

  <h4 style={{textAlign:'center'}}>Ingredients</h4>
  <div style={styleDiv}>
  {QuantityComponents}</div>
  <h4 style={{textAlign:'center'}}>Directions</h4>
  //<Steps steps={this.props.steps}/>
        </Dialog>
    );
  }
}
