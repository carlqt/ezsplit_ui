import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

class List extends Component {
  toSentence = (claimedBy) => {
    if (!claimedBy) { return }

    const initialVal = claimedBy.getIn([0, 'email']);

    return claimedBy.reduce(this.formSentence, initialVal);
  }

  formSentence = (mem, item, index, arr) => {
    if (index === 0) {
      return item.get('email');
    }

    return mem + (index - 1 === arr.size ? ', ' : ' and ') + item.get('email');
  }

  renderBody = (value, index) => {
    const { onChange } = this.props;
    const id = value.get('id');
    const name = value.get('name'); 
    const quantity = value.get('quantity');
    const price = value.get('price');
    const checked = value.get('checked');
    const claimedBy = this.toSentence(value.get('claimedBy'));

    return(
      <TableRow key={id}>
        <TableCell>
          <Checkbox
            value={index}
            color="primary"
            {...{ checked, onChange }}
          />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{quantity}</TableCell>
        <TableCell>{claimedBy}</TableCell>
        <TableCell>{price}</TableCell>
      </TableRow>
    );
  }

  render() {
    const {
      classes,
      data,
    } = this.props;

    return(
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Claimed By</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data.map(this.renderBody) }
        </TableBody>
      </Table>
    )
  }
}

const styles = theme => ({
});

export default withStyles(styles)(List);
