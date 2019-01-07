import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';

class CreateReceipt extends PureComponent {
  renderMembers = ({email, id}) => {
    const { onCheckboxChange } = this.props;

    return(
      <FormControlLabel
        key={id}
        label={email}
        control={
          <Checkbox
            value={id.toString()}
            color="primary"
            onChange={onCheckboxChange}
          />
        }
      />
    );
  }

  render() {
    const {
      members,
      receiptOnChange,
      classes,
      description,
      total,
      onNext,
    } = this.props;

    return(
      <div className={classes.formContainer}>
        <TextField
          className={classes.input}
          name="description"
          label="Receipt Name"
          onChange={receiptOnChange}
          value={description}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          className={classes.input}
          name="total"
          label="Total Cost"
          type="number"
          onChange={receiptOnChange}
          value={total}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">S$</InputAdornment>,
          }}
        />

        { members.map(this.renderMembers) }

        <Button variant="contained" color="primary" onClick={onNext}>Next</Button>
      </div>
    )
  }
}

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 10,
  },
  input: {
    marginTop: 10,
    marginLeft: 5,
  },
});

export default withStyles(styles)(CreateReceipt);
