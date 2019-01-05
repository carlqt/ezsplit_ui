import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Sidebar from 'Components/sidebar';
import styles from './styles';


class Receipts extends Component {
  componentDidMount() {
    const { getMembers, computedMatch } = this.props;
    const homeID = computedMatch.params.id;

    getMembers(homeID);
  }

  renderMembers = ({email, id}) => {

    return(
      <FormControlLabel
        key={id}
        label={email}
        control={
          <Checkbox
            value={1}
            color="primary"
          />
        }
      />
    );
  }

  render() {
    const { classes, members } = this.props;

    return (
      <div className={classes.root}>
        <Sidebar>
          <div className={classes.container}>
            <TextField
              className={classes.input}
              name="Receipt Name"
              label="Receipt Name"
            />
            <TextField
              className={classes.input}
              name="cost"
              label="Total Cost"
              type="number"
            />

            { members.map(this.renderMembers) }

            <Button variant="contained" color="primary">Next</Button>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default withStyles(styles)(Receipts);
