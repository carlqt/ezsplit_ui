import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class List extends Component {
  renderBody = (value) => {
    const id = value.profileId;
    const { email, balance } = value;

    return(
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{balance}</TableCell>
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
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data.valueSeq().map(this.renderBody) }
        </TableBody>
      </Table>
    )
  }
}

const styles = theme => ({
});

export default withStyles(styles)(List);
