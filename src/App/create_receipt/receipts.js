import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { currentHouse } from 'Lib/helpers';
import Loading from 'Components/loading';
import CreateReceipt from './forms/create_receipt';
import AddItems from './forms/add_items';
import styles from './styles';
import Stepper from './stepper';


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
    this.props.getCurrentHouse();
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

    const member = members.find(mem => mem.profileId == id);

    if (member) {
      receipt.members.push(member);
      this.setState({ receipt });
    }
  }

  removeMemberState = (id) => {
    const { receipt } = this.state;
    const members = receipt.members

    const index = members.findIndex(mem => mem.profileId == id);

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

  createReceipt = () => {
    const { createReceipt, openAlert  } = this.props;
    const { receipt } = this.state;
    const { id } = currentHouse();

    createReceipt(id, { receipt })
      .then(r => {
        openAlert('Success!');
      });
  }

  removeItem = (index) => {
    const { receipt } = this.state;

    receipt.items.splice(index, 1);
    this.setState({ receipt });
  }

  stepBack = () => {
    const { step } = this.state;

    this.setState({ step: step - 1 });
  }

  renderForms = () => {
    const { homeStore } = this.props;
    const { step, receipt } = this.state;
    const {
      description,
      total,
      items,
    } = receipt;
    const members = homeStore.get('members');

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
            createReceipt={this.createReceipt}
            stepBack={this.stepBack}
            {...{
              items,
              total,
            }}
          />
        );
      }
      default:
        return <div />;
    }
  }

  render() {
    const { classes, homeStore } = this.props;
    const { step } = this.state;

    if (homeStore.size === 0) {
      return <Loading />
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Stepper
            activeStep={step - 1}
          />
          { this.renderForms() }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Receipts);
