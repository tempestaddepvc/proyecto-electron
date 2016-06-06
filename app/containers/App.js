import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();
export default class App extends Component {
 static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
        <Header/>
        {this.props.children}
        </div>
  </MuiThemeProvider>
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools'); // eslint-disable-line global-require
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
