import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CustomStep from './CustomStep'

export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stepIndex: 0,
        steps: [],
    };
  };

  componentWillMount(){
    console.log("Steps will receive props");
    if(typeof this.props.steps !== 'undefined' && this.props.steps !== null){
      console.log("Steps se pasa por los huevos el if")
      console.log(this.props);
      this.state={
        steps: this.props.steps,
        stepIndex: 0,
    }
  }
}
changeStepIndex(newIndex){
  this.setState({
    stepIndex:newIndex
  })

}
  render() {
    const StepComponents = this.state.steps.map((step) => {
            return <CustomStep key={step.idmaking} {...step} changeStepIndex={this.changeStepIndex(step.idmaking).bind(this)}  />;
        });
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={this.state.stepIndex} orientation="vertical">
            {StepComponents}
        </Stepper>
      </div>
    );
  }
}
