import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { isAuthenticated } from 'Lib/helpers';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Loading from 'Components/loading';
import { invite } from 'Actions/homes';
import NotFound from 'Components/not_found';
import Form from './form';

class Invite extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      response: {
        status: null,
      },
      loading: true,
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    invite(params.token)
      .then(resp => {
        this.setState({
          data: resp.data,
          response: {
            status: resp.status,
          },
          loading: false,
        });
      })
  }

  onSubmit = (data) => {
    const { match: { params }, joinHome, openAlert } = this.props;

    joinHome(params.token, data)
      .then((resp) => {
        if (resp.ok) {
        } else {
          openAlert(resp.message, 'error')
        }
      })
  }

  render() {
    const { classes } = this.props;
    const { data, loading, response: { status } } = this.state;

    if (isAuthenticated()) {
      console.log('redirecting');
      return <Redirect to="/home" />;
    }

    if (loading) {
      return <Loading />
    }

    if (status === 404) {
      return <NotFound />
    }

    return(
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Joining { data.name }
          </Typography>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
          <Form
            onSubmit={this.onSubmit}
          />
          <Typography component="h1" variant="h5">
          </Typography>
        </Paper>
      </main>
    );
  }
}

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});

export default withRouter(withStyles(styles)(Invite));
