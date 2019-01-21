import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { getReceipt } from 'Actions/receipts';
import Immutable from 'immutable';
import Items from './items';

class Claim extends Component {
  constructor() {
    super()

    this.state = {
      data: Immutable.Map(),
    }
  }

  async componentDidMount() {
    const { computedMatch: { params } } = this.props;
    const resp = await getReceipt(params.id);
    this.setState({
      data: Immutable.fromJS(resp.data)
    });
  }

  onItemChange = (event) => {
    const { data } = this.state;
    const {
      checked,
      value,
    } = event.target;

    const item = data.getIn(['items',value]);
    this.setState(({data}) => {
      return { data: data.setIn(['items', value, 'checked'], checked) }
    });
  }

  currentShare = () => {
    const { data } = this.state;
    const items = data.get('items');

    if (!items || items.size == 0) { return 0 }

    return items.filter(item => item.get('checked')).reduce((mem, item) => {
      return mem + (item.get('quantity') * item.get('price'))
    }, 0);
  }

  render() {
    const { classes, homeStore } = this.props;
    const { data } = this.state;
    const items = data.get('items');
    const members = homeStore.get('members');

    return(
      <div className={classes.container}>
        <div className={classes.row}>
          <h2 className={classes.header}>Receipt</h2>
        </div>

        <div className={classes.row}>
          <h2 className={classes.header}>Your Share - {this.currentShare()}</h2>
        </div>

        <div className={classes.row}>
          { data.size > 0 ?
              <Items
                data={items}
                onChange={this.onItemChange}
                {...{ members }}
              /> :
              <div />
          }
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

export default withRouter(withStyles(styles)(Claim));
