import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class List extends Component {
  renderData = (value) => (
    <TableCell key={value}>{value}</TableCell>
  )

  renderBody = (value) => {
    return(
      <TableRow key={value.id}>
        { Object.values(value).map(this.renderData) }
      </TableRow>
    );
  }

  render() {
    const {
      classes,
      data,
    } = this.props;

    const obj = data[0] || {}

    return(
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            { Object.keys(obj).map(this.renderData) }
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
