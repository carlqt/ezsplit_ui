import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';

class CreateReceipt extends PureComponent {
  renderMembers = (member) => {
    const { onCheckboxChange } = this.props;
    const { email, profileId } = member;

    return(
      <FormControlLabel
        key={profileId}
        label={email}
        control={
          <Checkbox
            value={profileId}
            color="primary"
            onChange={onCheckboxChange}
          />
        }
      />
    );
  }

  onSubmit = (event) => {
    const { onNext } = this.props;
    onNext();
    event.preventDefault();
  }

  render() {
    const {
      members,
      receiptOnChange,
      classes,
      description,
      total,
    } = this.props;

    return(
      <form className={classes.formContainer} onSubmit={this.onSubmit}>
        <TextField
          required
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

        { members.valueSeq().map(this.renderMembers) }

        <Button type="submit" variant="contained" color="primary">Next</Button>
      </form>
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
