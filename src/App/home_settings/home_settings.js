import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import RootRef from '@material-ui/core/RootRef';

class Settings extends Component {
  constructor() {
    super()

    this.state = {
      helperText: '',
    }

    this.inviteLinkRef = React.createRef();
  }

  copyToClipboard = (event) => {
    const input = this.inviteLinkRef.current.querySelector("input");
    input.select();
    document.execCommand('copy');
    this.setState({ helperText: 'Copied' });
  }

  render() {
    const { classes, home } = this.props;
    const { helperText } = this.state;
    const token = home.get('token');
    const inviteURL = `http://localhost:3000/invite/${token}`
    const name = home.get('name');

    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.row}>
            <h2 className={classes.header}>{name}</h2>
          </div>

          <div className={classes.row}>
            <RootRef rootRef={this.inviteLinkRef}>
              <TextField
                {...{ helperText }}
                ref={this.inviteLinkRef}
                variant="outlined"
                readOnly
                fullWidth
                label="Invite Link"
                value={inviteURL}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CopyIcon
                        className={classes.copy}
                        onClick={this.copyToClipboard}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </RootRef>
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
  },
  copy: {
    cursor: 'pointer',
  }
});

export default withStyles(styles)(Settings);
