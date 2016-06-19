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

  render() {
    const StepComponents = this.state.steps.map((step,i) => {
            return <CustomStep stepNumber={i +1} key={step.idmaking -1} {...step}  />;
        });
    return (
      <div>

            {StepComponents}

      </div>
    );
  }
}
