import React from 'react';
import Recipe from '../components/Recipe'

export default class RecipesPage extends React.Component{

render(){
  const styleDiv = {
   textAlign: 'center',
   marginTop: '40px'
  }

  return(
    <div style={styleDiv}>
    <Recipe/>
  </div>
  )
}

}
