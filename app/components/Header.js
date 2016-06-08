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



export default class Header extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      openSnackbar: false,
      message: 'Mensaje',
      disabledButton: true,
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
     this.context.router.replace('/recipes')
     this.handleDrawerClose();
  };
  render(){
  return(
    <div>
        <AppBar
        title="Proyecto final"
        iconElementLeft={<IconButton disabled={this.state.disabledButton} onTouchTap={this.handleDrawerToggle.bind(this)}><NavigationMenu /></IconButton>}
      />
      <Drawer
        docked={false}
        width={200}
        open={this.state.openDrawer}
        onRequestChange={this.handleDrawerClose.bind(this)}
      >
        <h1>Aquí va el<br/> logo</h1>
        <MenuItem onTouchTap={this.handleDrawerClose.bind(this)}>goToCount</MenuItem>
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
