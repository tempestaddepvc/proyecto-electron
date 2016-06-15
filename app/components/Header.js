import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem'
import UserStore from "../stores/UserStore";
import {  IndexLink, Link }  from 'react-router';
import * as UserActions from '../actions/UserActions';
import dispatcher from "../dispatcher";
import Snackbar from 'material-ui/Snackbar';
import * as RecipesActions from '../actions/RecipesActions';
import Divider from 'material-ui/Divider';


export default class Header extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      openSnackbar: false,
      message: 'Mensaje',
      disabledButton: true,
      usuario: 'usuario'
    };

  };

  componentWillMount() {
    UserStore.on("change", () => this.onUserChange());
    dispatcher.register(this.handleDispatch.bind(this));
  };

  handleDispatch(action){
    switch(action.type) {
      case "MESSAGE": {
        this.showSnackbar(action.message) ;
        break;
      }

    }

  };

  componentWillUnmount() {
    UserStore.removeListener("change", this.onUserChange.bind(this));
  };

  onUserChange(){
    if(UserStore.getUsername()==undefined){
      this.showSnackbar("Logged out");
      this.setState(
        {
          disabledButton:true,
        }
      )
      this.goToLogin();

    }
    else{
        this.setState(
          {
            usuario:UserStore.getUsername(),
            disabledButton:false,
          }
        )
        this.goToRecipes();
    }
  };
  showSnackbar = (message) => {
    this.setState({
      openSnackbar: true,
      message
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };
  handleDrawerToggle = () => this.setState({openDrawer: !this.state.openDrawer});
  handleDrawerClose = () => this.setState({openDrawer: false});
  onTapLogOut(){
    UserActions.logOut();
    }
  goToLogin(){
     this.context.router.replace('/')
     this.handleDrawerClose();
  };
  goToRecipes(){
    RecipesActions.getAllRecipes();
     this.context.router.replace('/recipes');

  };
  auxMenuRecipes(){



    this.context.router.replace('/recipes');

    this.handleDrawerClose();
  }

  handleAllRecipes(){
    RecipesActions.getAllRecipes();
        this.auxMenuRecipes()
  }
  handleMyRecipes(){
    RecipesActions.getMyRecipes();
        this.auxMenuRecipes()
  }
  handleMineAndFavs(){
    RecipesActions.getMyRecipesAndFavs();
      this.auxMenuRecipes()
  }
  handleMyFavs(){
    RecipesActions.getMyFavs();
    this.auxMenuRecipes()
  }
  handleByName(){
    this.context.router.replace('/searchByName')
    this.handleDrawerClose();
  }
  handleByIngredients(){
    this.context.router.replace('/SearchByIngredients')
    this.handleDrawerClose();
  }

  render(){
    const logoStyle = {
      height:'200px',
      width:'200px'
    };
    const indent={
      textIndent: '10px'
    }
  return(
    <div >
        <AppBar
        title="Proyecto final"
        iconElementLeft={<IconButton disabled={this.state.disabledButton} onTouchTap={this.handleDrawerToggle.bind(this)} ><NavigationMenu /></IconButton>}
      />
      <Drawer
        docked={false}
        width={200}
        open={this.state.openDrawer}
        onRequestChange={this.handleDrawerClose.bind(this)}
      >
        <img src="./components/logo.png" style={logoStyle}/>
        <p style={indent}> Logged in as</p>
        <h3 style={indent}>{this.state.usuario}</h3>
        <Divider/>
        <MenuItem onTouchTap={this.handleMyRecipes.bind(this)}>My recipes</MenuItem>
        <MenuItem onTouchTap={this.handleMyFavs.bind(this)}>Favorite recipes</MenuItem>
        <MenuItem onTouchTap={this.handleMineAndFavs.bind(this)}>Mine & Favorites</MenuItem>
          <MenuItem onTouchTap={this.handleAllRecipes.bind(this)}>All recipes</MenuItem>
        <Divider/>
        <MenuItem  menuItems={[
                <MenuItem primaryText="By name" onTouchTap={this.handleByName.bind(this)}
              />,
                <MenuItem primaryText="By ingredients"  />
              ]}>Search</MenuItem>

         <Divider />
        <MenuItem onTouchTap={this.onTapLogOut.bind(this)}>Log out</MenuItem>

      </Drawer>
      <Snackbar
      open={this.state.openSnackbar}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackbarClose}
      message={this.state.message}
    />
    </div>
    )
}

self=this;
}
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}
