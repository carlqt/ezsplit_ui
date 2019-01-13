import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class Alert extends Component {
  render() {
    const {
      classes,
      closeAlert,
      alert,
    } = this.props;

    const open = alert.get('visible');
    const body = alert.get('body');

    return(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
      >
        <SnackbarContent
          className={`${classes.success} ${classes.margin}`}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon className={`${classes.success} ${classes.icon}`} />
              { body }
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={closeAlert}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          Other
        />
      </Snackbar>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  success: {
    backgroundColor: '#43a047',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  icon: {
    fontSize: 20,
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(Alert);
