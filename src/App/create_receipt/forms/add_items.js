import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';

class CreateReceipt extends Component {
  constructor() {
    super();
    this.state = {
      currentCost: 0,
    }
  }

  currentCost = () => {
    const { items } = this.props;
    return items.reduce((mem, item) => {
      return mem = mem + (item.quantity * item.price)
    }, 0)
  }

  renderItem = (item, index) => {
    const { classes, updateItem, removeItem } = this.props;

    return(
      <div key={index} className={classes.menuItem}>
        <TextField
          className={classes.input}
          name="name"
          label="Name"
          value={item.name}
          onChange={(e) => updateItem(e, index)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={classes.input}
          name="price"
          label="Price"
          type="number"
          value={item.price}
          onChange={(e) => updateItem(e, index)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">S$</InputAdornment>,
          }}
        />
        <TextField
          className={classes.input}
          name="quantity"
          label="Quantity"
          type="number"
          value={item.quantity}
          onChange={(e) => updateItem(e, index)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          className={classes.input}
          onClick={() => removeItem(index)}
        >
          <ClearIcon />
        </Button>
      </div>
    );
  }

  render() {
    const {
      classes,
      items,
      addItem,
      createReceipt,
      total,
      stepBack,
    } = this.props;

    return(
      <div className={classes.formContainer}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={stepBack}
        >
          Back
        </Button>
        <div>
          Total Cost: {total}
        </div>
        <div>
          Current Cost: {this.currentCost()}
        </div>
        { items.map(this.renderItem) }
        <Button className={classes.input} onClick={addItem} variant="contained" color="primary">Add</Button>
        <Button className={classes.input} onClick={createReceipt} variant="contained" color="primary">Create</Button>
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
    marginLeft: 5,
    marginTop: 10,
  },
  menuItem: {
    display: 'flex',
    paddingBottom: 10,
  },
});

export default withStyles(styles)(CreateReceipt);
