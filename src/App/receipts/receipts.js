import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Sidebar from 'Components/sidebar';
import styles from './styles';


class Receipts extends Component {
  constructor() {
    super();

    this.state = {
      receipt: {
        description: '',
        total: '',
        members: [],
        items: [],
      },
      step: 1,
    }
  }

  componentDidMount() {
    const { getMembers, computedMatch } = this.props;
    const homeID = computedMatch.params.id;

    getMembers(homeID);
  }

  receiptOnChange = (event) => {
    const { name, value } = event.target;
    const { receipt } = this.state;
    receipt[name] = value;

    this.setState({ receipt });
  }

  onCheckboxChange = (event, checked) => {
    const { value } = event.target;

    if (checked) {
      this.insertMemberState(value);
    } else {
      this.removeMemberState(value);
    }
  }

  insertMemberState = (id) => {
    const { receipt } = this.state;
    const { members } = this.props;

    const member = members.find(mem => mem.id === id);

    if (member) {
      receipt.members.push(member);
      this.setState({ receipt });
    }
  }

  removeMemberState = (id) => {
    const { receipt } = this.state;
    const members = receipt.members

    const index = members.findIndex(mem => mem.id === id);

    if (index >= 0) {
      receipt.members.splice(index, 1);
      this.setState({ receipt });
    }
  }

  renderMembers = ({email, id}) => {
    return(
      <FormControlLabel
        key={id}
        label={email}
        control={
          <Checkbox
            value={id.toString()}
            color="primary"
            onChange={this.onCheckboxChange}
          />
        }
      />
    );
  }

  render() {
    const { classes, members } = this.props;
    const {
      description,
      total,
    } = this.state.receipt;

    return (
      <div className={classes.root}>
        <Sidebar>
          <div className={classes.container}>
            <div className={classes.formContainer}>
              <TextField
                className={classes.input}
                name="description"
                label="Receipt Name"
                onChange={this.receiptOnChange}
                value={description}
              />
              <TextField
                className={classes.input}
                name="total"
                label="Total Cost"
                type="number"
                onChange={this.receiptOnChange}
                value={total}
              />

              { members.map(this.renderMembers) }

              <Button variant="contained" color="primary">Next</Button>
            </div>

            <div className={classes.formContainer}>
              <div className={classes.menuItem}>
                <TextField
                  className={classes.input}
                  name="Name"
                  label="Name"
                />
                <TextField
                  className={classes.input}
                  name="price"
                  label="Price"
                  type="number"
                />
                <TextField
                  className={classes.input}
                  name="quantity"
                  label="Quantity"
                  type="number"
                />
              </div>
              <Button variant="contained" color="primary">Create</Button>
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default withStyles(styles)(Receipts);
