import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

class List extends Component {
  renderBody = (value) => {
    const id = value.get('id');
    const name = value.get('name'); 
    const quantity = value.get('quantity');
    const price = value.get('price');

    return(
      <TableRow key={id}>
        <TableCell>
          <Checkbox
            value={id}
            color="primary"
          />
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{quantity}</TableCell>
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
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
