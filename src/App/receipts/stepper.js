import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

class ReceiptStepper extends Component {
  renderSteps = (item, index) => {
    return(
      <Step key={item}>
        <StepLabel>{item}</StepLabel>
      </Step>
    );
  }

  render() {
    const { activeStep } = this.props;
    const steps = ['Create Receipt', 'Add items'];

    return(
      <div>
        <Stepper {...{ activeStep }}>
          { steps.map(this.renderSteps) }
        </Stepper>
      </div>
    );
  }
}

const styles = theme => ({
});

export default withStyles(styles)(ReceiptStepper);
