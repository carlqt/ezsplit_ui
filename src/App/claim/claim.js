import React, { Component } from 'react';
import Immutable from 'immutable';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { getReceipt, claimItems } from 'Actions/receipts';
import Button from '@material-ui/core/Button';
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
    const {
      checked,
      value,
    } = event.target;

    this.setState(({data}) => {
      return { data: data.setIn(['items', value, 'checked'], checked) }
    });
  }

  currentShare = () => {
    const { data } = this.state;
    const items = data.get('items');

    if (!items || items.size === 0) { return 0 }

    return items.filter(item => item.get('checked')).reduce((mem, item) => {
      return mem + parseFloat(item.get('price') || 0) / item.get('claimedBy').size
    }, 0);
  }

  handleClaim = () => {
    const { computedMatch: { params } } = this.props;
    const { data } = this.state;
    const selectedItems = data.get('items').filter((item) => {
      return item.get('checked') === true
    });

    claimItems(selectedItems.toJS(), params.id)
      .then((resp) => {
        this.setState({
          data: Immutable.fromJS(resp.data)
        })
      });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    const items = data.get('items');

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
              /> :
              null
          }
        </div>

        <div className={classes.row}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClaim}
          >
            Claim
          </Button>
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
    padding: 18,
  },
  header: {
    flexGrow: 2,
  }
});

export default withRouter(withStyles(styles)(Claim));
