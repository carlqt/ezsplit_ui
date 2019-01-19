import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = (props) => {
  const { classes } = props;

  return(
    <div className={classes.container}>
      <CircularProgress
        color="primary"
      />
    </div>
  );
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(styles)(Loading);
