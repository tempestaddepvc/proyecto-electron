import React from 'react';
import Paper from 'material-ui/Paper';
import Login from '../components/Login'

export default class Header extends React.Component{

render(){
  const styleDiv = {
   textAlign: 'center',
   marginTop: '95px'
  }
  const stylePaper = {
    height: 470,
    width: 400,
    textAlign: 'center',
    display: 'inline-block',

  };
  return(
    <div style={styleDiv}>
  <Paper style={stylePaper}  zDepth={3}>
    <Login/>
  </Paper>
  </div>
  )
}

}
