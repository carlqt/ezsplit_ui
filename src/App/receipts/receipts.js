import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';

import List from './list';

class Receipts extends Component {
  componentDidMount = () => {
    const { computedMatch, getReceipts } = this.props;
    const { id }= computedMatch.params

    getReceipts(id);
  }

  createReceipt = () => {
    const { history } = this.props;

    history.push('receipts/new');
  }

  render() {
    const { classes, receipts } = this.props;

    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.row}>
            <h2 className={classes.header}>Receipts</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={this.createReceipt}
            >
              <CreateIcon />
              Create
            </Button>
          </div>

          <div className={classes.row}>
            <List
              {...{ receipts }}
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

export default withRouter(withStyles(styles)(Receipts));
