import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import dateFns from 'date-fns';

class List extends Component {
  renderBody = (value) => {
    const id = value.get('id');
    const date = value.get('date');
    const name = value.get('name');
    const price = value.get('price');
    const formattedDate = dateFns.parse(date).toDateString();

    return(
      <TableRow key={id}>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>
          <DeleteIcon color="error" />
          <DescriptionIcon color="primary" />
        </TableCell>
      </TableRow>
    );
  }

  render() {
    const {
      classes,
      receipts,
    } = this.props;

    return(
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { receipts.map(this.renderBody) }
        </TableBody>
      </Table>
    )
  }
}

const styles = theme => ({
});

export default withStyles(styles)(List);
