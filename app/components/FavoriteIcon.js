import React from 'react';
import FavsStore from '../stores/FavsStore';
import * as FavsActions from '../actions/FavsActions';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import BorderFavoriteIcon from 'material-ui/svg-icons/action/favorite-border'
import IconButton from 'material-ui/IconButton';
export default class Favorite extends React.Component{
  constructor(props) {
    super(props);

  };
  componentWillMount() {
    FavsStore.on("change", () => this.onFavsChange());
    this.state = {
      id: this.props.idrecipe,
    };
    this.onFavsChange();
  };

  componentWillUnmount() {
  FavsStore.removeListener("change", this.onFavsChange);
}



  onFavsChange(){
    console.log('Llega al onFavsChange')
    console.log(FavsStore.getFavs());
    if(FavsStore.getFavs().includes(this.state.id)){
      this.setState({
        icon: <FavoriteIcon color={this.props.color}/>,
        favorite: true
      });
    }else{
      this.setState({
        icon: <BorderFavoriteIcon color={this.props.color}/>,
        favorite: false
      });
    }

  }

handleTouch(e){
  e.stopPropagation();
  if(!this.state.favorite){
    FavsActions.createFav(this.state.id);
  }else {
    FavsActions.deleteFav(this.state.id);
  }
}
render(){
  return(
      <IconButton onClick={this.handleTouch.bind(this)}>{this.state.icon}</IconButton>
  )
}

}
