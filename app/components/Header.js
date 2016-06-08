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
      message: 'Mensaje'
    };

  };

  componentWillMount() {
    UserStore.on("change", this.onUserChange);
    dispatcher.register(this.handleDispatch);
  };

  handleDispatch(action){
    switch(action.type) {
      case "MESSAGE": {
        console.log("hasta aquí llego")
       ;
        break;
      }

    }

  };
  showSnackbar(message){
    this.setState({
      openSnackbar:true,
      message: message
    })
  };
  componentWillUnmount() {
    UserStore.removeListener("change", this.onUserChange);
  };

  onUserChange(){
    if(UserStore.user==undefined){
      this.showSnackbar("Logged out ");
      this.goToLogin();

    }
    else{


    }
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
  render(){
  return(
    <div>
        <AppBar
        title="Proyecto final"
        iconElementLeft={<IconButton onTouchTap={this.handleDrawerToggle.bind(this)}><NavigationMenu /></IconButton>}
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


}
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}
