import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem'
import {  IndexLink, Link }  from 'react-router'

export default class Header extends React.Component{

  constructor(props) {
    super(props);
    this.state = {openDrawer: false};
  }

  handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});
  handleClose = () => this.setState({openDrawer: false});
render(){
  return(
    <div>
        <AppBar
        title="Proyecto final"
        iconElementLeft={<IconButton onTouchTap={this.handleToggle.bind(this)}><NavigationMenu /></IconButton>}
      />
      <Drawer
        docked={false}
        width={200}
        open={this.state.openDrawer}
        onRequestChange={this.handleClose.bind(this)}
      >
        <h1>Aquí va el<br/> logo</h1>
        <MenuItem onTouchTap={this.handleClose.bind(this)}><Link to='counter'>goToCount</Link></MenuItem>
        <MenuItem onTouchTap={this.handleClose.bind(this)}>Mis favoritos</MenuItem>
      </Drawer>
      <h1>EL troleo es real</h1>
      <div>{this.props.children}</div>
    </div>
    )
}


}
