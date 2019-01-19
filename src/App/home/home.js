import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Loading from 'Components/loading';
import { currentHouse } from 'Lib/helpers';
import Members from './members';

class Home extends Component {
  componentDidMount() {
    // load any needed here
    const { id } = currentHouse();
    const {
      getCurrentHouse,
    } = this.props;

    if (id) { getCurrentHouse() };
  }

  renderContents = () => {
    const { classes, home } = this.props;

    if (home.size === 0) {
      return(
        <Loading />
      )
    }

    const members = home.get('members');

    return(
      <div className={classes.container}>
        <div className={classes.row}>
          <h2 className={classes.header}>Dashboard</h2>
        </div>

        <div className={classes.row}>
          <Members
            data={members}
          />
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        { this.renderContents() }
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
