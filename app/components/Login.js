import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as UserActions from '../actions/UserActions'
export default class Header extends React.Component{

  handleClickRegister(){
      UserActions.register(this.refs.username.getValue(),this.refs.password.getValue());
    }
  handleClickLogin(){
    UserActions.logIn(this.refs.username.getValue(),this.refs.password.getValue());
  }
  render(){
    const listStyle=
      {
        listStyleType:'none',
        marginTop: '20px',

      }
    const logoStyle=
    {
      width: '250px',
     height: '250px'
    }
    const registerBtnStyle={
      float: 'left',
      marginLeft: '35px'
    }
    const loginBtnStyle={
      float: 'right',
      marginRight: '35px'
    }
    const btnRowStyle={
      marginTop: '7px'
    }
    return(
      <ul style={listStyle}>
      <li><img src="./components/logo.png" style={logoStyle}/></li>

      <li><TextField
      ref='username'
        hintText="User"
        floatingLabelText="User"
      /></li>
      <li><TextField
      ref='password'
       hintText="Password"
       floatingLabelText="Password"
       type="password"
     /></li>
     <li style={btnRowStyle}><FlatButton label="Register" onTouchTap={this.handleClickRegister.bind(this)}  secondary={true} style={registerBtnStyle}/><FlatButton onTouchTap={this.handleClickLogin.bind(this)} label="Log in" primary={true} style={loginBtnStyle}/> </li>
     </ul>
    )
  }

  }
