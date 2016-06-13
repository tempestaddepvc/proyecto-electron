import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class FullRecipeDialog extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          modal={true}
          open={this.props.isOpen}
          autoScrollBodyContent={true}
        >
        </Dialog>
      </div>
    );
  }
}
