import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from 'App/protected_route';
import Login from 'App/login';
import Home from 'App/home';
import CreateReceipt from 'App/create_receipt';
import Receipts from 'App/receipts';
import Alert from 'Components/alerts';

class App extends Component {
  componentDidMount() {
    // load any needed here
    this.props.getAccount();
  }

  render() {
    const { appStore } = this.props;
    const alert = appStore.get('alert');

    return (
      <Router>
        <div className="routerContainer">
          <Route path="/login" component={Login} />
          <Switch>
            <ProtectedRoute path="/home/:id/receipts/new" component={CreateReceipt} />
            <ProtectedRoute path="/home/:id/receipts" component={Receipts} />
            <ProtectedRoute path="/home/:id" component={Home} />
            <ProtectedRoute path="/home/" component={Home} />
          </Switch>

          { alert.get('visible') ?  <Alert /> : <div /> }
        </div>
      </Router>
    )
  }
}

export default App;
