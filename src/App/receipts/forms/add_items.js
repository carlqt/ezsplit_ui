import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';

class CreateReceipt extends Component {
  renderItem = (item, index) => {
    const { classes, updateItem, removeItem } = this.props;

    return(
      <div className={classes.menuItem}>
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
    } = this.props;

    return(
      <div className={classes.formContainer}>
        { items.map(this.renderItem) }
        <Button onClick={addItem} variant="contained" color="primary">Add</Button>
        <Button variant="contained" color="primary">Create</Button>
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
  },
  menuItem: {
    display: 'flex',
    paddingBottom: 10,
  },
});

export default withStyles(styles)(CreateReceipt);
