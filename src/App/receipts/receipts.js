import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Sidebar from 'Components/sidebar';
import CreateReceipt from './forms/create_receipt';
import AddItems from './forms/add_items';
import styles from './styles';


class Receipts extends Component {
  constructor() {
    super();

    this.state = {
      receipt: {
        description: '',
        total: '',
        members: [],
        items: [
          {
            name: '',
            quantity: '',
            price: '',
          }
        ],
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

    const member = members.find(mem => mem.id == id);

    if (member) {
      receipt.members.push(member);
      this.setState({ receipt });
    }
  }

  removeMemberState = (id) => {
    const { receipt } = this.state;
    const members = receipt.members

    const index = members.findIndex(mem => mem.id == id);

    if (index >= 0) {
      receipt.members.splice(index, 1);
      this.setState({ receipt });
    }
  }

  onNext = () => {
    this.setState({ step: 2 });
  }

  addItem = () => {
    const { receipt } = this.state;
    const { items } = receipt;
    const emptyItem = {
      name: '',
      quantity: '',
      price: '',
    }

    receipt.items = items.concat(emptyItem)
    this.setState({ receipt });
  }

  updateItem = (event, index) => {
    const { name, value } = event.target;
    const { receipt } = this.state;

    receipt.items[index][name] = value;

    this.setState({ receipt });
  }

  removeItem = (index) => {
    const { receipt } = this.state;

    receipt.items.splice(index, 1);
    this.setState({ receipt });
  }

  renderForms = () => {
    const { members } = this.props;
    const { step, receipt } = this.state;
    const {
      description,
      total,
      items,
    } = receipt;

    switch (step) {
      case 1: {
        return(
          <CreateReceipt
            onCheckboxChange={this.onCheckboxChange}
            receiptOnChange={this.receiptOnChange}
            onNext={this.onNext}
            {...{ members, description, total }}
          />
        );
      }
      case 2: {
        return(
          <AddItems
            addItem={this.addItem}
            removeItem={this.removeItem}
            updateItem={this.updateItem}
            {...{ items }}
          />
        );
      }
      default:
        return <div />;
    }
  }

  render() {
    const { classes } = this.props;

    console.log(this.state);

    return (
      <div className={classes.root}>
        <Sidebar>
          <div className={classes.container}>
            { this.renderForms() }
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default withStyles(styles)(Receipts);
