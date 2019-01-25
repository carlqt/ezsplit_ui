import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField  from '@material-ui/core/TextField';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: null,
    };
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]:  value,
    })
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;

    onSubmit(this.state)
      .then(resp => {
        if (resp.ok) {
        } else {
          this.setState({errors: resp.message})
        }
      })
    event.preventDefault();
  }


  render() {
    const { errors, email, password } = this.state;
    const { classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
            value={email}
            label="Email"
            helperText={Boolean(errors) ? errors : ""}
            error={Boolean(errors)}
            required
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange}
            value={password}
            label="Password"
            required
            helperText={Boolean(errors) ? errors : ""}
            error={Boolean(errors)}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign in
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
});

export default withStyles(styles)(Form);
