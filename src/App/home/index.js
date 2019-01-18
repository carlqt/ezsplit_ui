import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Sidebar from 'Components/sidebar';
import Table from 'Components/table';

class Home extends Component {
  render() {
    const { classes } = this.props;
    const data = [
      {
        id: 1,
        email: 'carl@gmail.com',
        balance: 120,
      },
      {
        id: 2,
        email: 'anne@gmail.com',
        balance: -10,
      },
    ]

    return(
      <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.row}>
              <h2 className={classes.header}>Dashboard</h2>
            </div>

            <div className={classes.row}>
              <Table
                {...{ data }}
              />
            </div>
          </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: 18,
  },
  header: {
    flexGrow: 2,
  }
});

export default withStyles(styles)(Home);
