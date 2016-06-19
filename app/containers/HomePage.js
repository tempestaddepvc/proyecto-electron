import React, { Component } from 'react';
import Header from '../components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();
export default class HomePage extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <Header />
      </MuiThemeProvider>
    );
  }
}
