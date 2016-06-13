import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Search from 'material-ui/svg-icons/action/search';
import * as RecipesActions from '../actions/RecipesActions';
export default class SearchByName extends React.Component{
  constructor(props) {
    super(props);
    };

  handleCLickSearch(){
    RecipesActions.searchByName(this.refs.search.getValue());
    this.context.router.replace('/recipes');


  };
render(){
  const styleDiv = {
   textAlign: 'center',
   marginTop: '200px'
  }
  const stylePaper = {
    height: 225,
    width: 400,
    textAlign: 'center',
    display: 'inline-block',

  };
  return(
    <div style={styleDiv}>
    <Paper style={stylePaper}>
      <h1>Search by name</h1>
      <TextField
      ref='search'
        hintText="Recipe name"
        floatingLabelText="Recipe name"
      /><br/><br/>
      <RaisedButton
      label="search"
      primary={true}
      icon={<Search/>}
      onTouchTap={this.handleCLickSearch.bind(this)}
    />
  </Paper>
  </div>
  )
}

}
SearchByName.contextTypes = {
  router: React.PropTypes.object.isRequired
}
