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

  render() {
    const { data } = this.state;
    const items = data.get('items');

    return(
      <div>
        { data.size > 0 ?
            <Items
              data={items}
            /> :
            <div />
        }
      </div>
    );
  }
}

const styles = theme => ({
});

export default withRouter(withStyles(styles)(Claim));
