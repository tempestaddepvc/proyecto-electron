import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

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
        iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationMenu /></IconButton>}
      />
      <Drawer
        docked={false}
        width={200}
        open={this.state.openDrawer}
        onRequestChange={(open) => this.setState({open})}
      >
        <MenuItem onTouchTap={this.handleClose}>Mis recetas</MenuItem>
        <MenuItem onTouchTap={this.handleClose}>Mis favoritos</MenuItem>
      </Drawer>
    </div>
    )
}


}
