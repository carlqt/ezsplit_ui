import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { currentHouse } from 'Lib/helpers';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import ReceiptIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Radio from '@material-ui/core/Radio';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      groupMenu: {
        isCollapsed: true,
      },
      selectedGroup: null,
    }
  }

  openMenu = () => {
    const { groupMenu } = this.state;
    groupMenu.isCollapsed = !groupMenu.isCollapsed;

    this.setState({ groupMenu });
  }

  houseSelect = (house) => {
    const { getHome, history } = this.props;
    const houseJSON = JSON.stringify(house.toJS());
    localStorage.setItem('house', houseJSON);

    getHome(house.get('id'));
    history.push('/home');
  }

  renderMenuItems = (house) => {
    const { classes } = this.props;
    const { id: currentHouseId } = currentHouse();
    const id = house.get('id');
    const name = house.get('name');

    return(
      <ListItem
        key={id}
        button
        className={classes.nested}
        onClick={() => this.houseSelect(house)}
      >
        <Radio
          checked={ currentHouseId === id }
        />
        <ListItemText inset primary={name} />
      </ListItem>
    )
  }

  render() {
    const { classes, accountStore, logout } = this.props;
    const { groupMenu } = this.state;
    const { isCollapsed } = groupMenu;
    const groups = accountStore.get('groups');

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
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <ListItem button key="Home">
                <ListItemIcon><DashboardIcon/></ListItemIcon>
                  <ListItemText primary="Home"/>
              </ListItem>
            </Link>

            <Link to="/home/receipts" style={{ textDecoration: 'none' }}>
              <ListItem button key="Create Receipts">
                <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary="Receipts"/>
              </ListItem>
            </Link>

            <ListItem button key="Group" onClick={this.openMenu}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary="Group"/>
              { isCollapsed ? <ExpandMore /> : <ExpandLess /> }
            </ListItem>
            <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { groups.map(this.renderMenuItems) }
                <ListItem
                  button
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Create Group" />
                </ListItem>
              </List>
            </Collapse>

            <Link to="/home/settings" style={{ textDecoration: 'none' }}>
              <ListItem button key="House Settings">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="House Settings"/>
              </ListItem>
            </Link>

            <ListItem button key="Sign out" onClick={logout}>
              <ListItemIcon><PowerIcon /></ListItemIcon>
                <ListItemText primary="Sign out"/>
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
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

export default withRouter(withStyles(styles)(Sidebar));
