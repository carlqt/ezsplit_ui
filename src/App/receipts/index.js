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
  render() {
    const { classes } = this.props;
    const peeps = [
      { name: "Joanne" },
      { name: "Mark" },
      { name: "Kux" },
      { name: "Arizia" },
      { name: "Steph" },
    ];

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

            <FormControlLabel
              label="Joanne"
              control={
                <Checkbox
                  value={1}
                  color="primary"
                />
              }
            />

            <Button variant="contained" color="primary">Next</Button>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default withStyles(styles)(Receipts);
