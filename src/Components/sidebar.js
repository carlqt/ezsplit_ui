import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            <ListItem button key="Group">
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary="Group"/>
            </ListItem>

            <ListItem button key="Create Receipts">
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <Link to="/home/2/receipts/new" style={{ textDecoration: 'none' }}>
                <ListItemText primary="Create Receipts"/>
              </Link>
            </ListItem>
          </List>
        </Drawer>
        { this.props.children }
      </div>
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
  }
});

export default withStyles(styles)(Sidebar);
