import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent
} from 'material-ui/Stepper';

export default class Steps extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
          <Step>
            <StepButton onTouchTap={this.props.changeStepIndex}>
              {this.props.step}
            </StepButton>
            <StepContent>
              <img src={this.props.picture} style={{
                width:'100%',
                 height:'100%',
                 margin: 'auto',
                 display: 'block',
              }}/>
            </StepContent>
          </Step>

    );
  }
}
