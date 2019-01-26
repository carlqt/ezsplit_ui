import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField  from '@material-ui/core/TextField';

class Form extends PureComponent {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]:  value,
    })
  }

  onSubmit = (event) => {
    this.props.onSubmit(this.state);
    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;

    const { classes } = this.props;

    return(
      <form className={classes.form} onSubmit={this.onSubmit}>
        <TextField
          className={classes.formElement}
          name="email"
          autoComplete="email"
          autoFocus
          label="Email"
          required
          fullWidth
          onChange={this.onChange}
          value={email}
        />
        <TextField
          className={classes.formElement}
          name="password"
          label="Password"
          type="password"
          required
          fullWidth
          onChange={this.onChange}
          value={password}
        />
        <TextField
          className={classes.formElement}
          name="passwordConfirmation"
          label="Password Confirmation"
          required
          fullWidth
          type="password"
          value={passwordConfirmation}
          onChange={this.onChange}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
      </form>
    )
  }
}

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formElement: {
    marginTop: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(Form);
