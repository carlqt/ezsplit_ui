import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from 'App/protected_route';
import Login from 'App/login';
import Home from 'App/home';
import CreateReceipt from 'App/create_receipt';
import Receipts from 'App/receipts';
import Alert from 'Components/alerts';
import Claim from 'App/claim';
import Invite from 'App/invite';
import HomeSettings from 'App/home_settings';

class App extends Component {
  render() {
    const { appStore } = this.props;
    const alert = appStore.get('alert');

    return (
      <Router>
        <div className="routerContainer">
          <Route exact path="/login" component={Login} />
          <Route exact path="/invite/:token" component={Invite} />

          <Switch>
            <ProtectedRoute exact path="/home/receipts/new" component={CreateReceipt} />
            <ProtectedRoute path="/home/receipts/:id" component={Claim} />
            <ProtectedRoute exact path="/home/settings" component={HomeSettings} />
            <ProtectedRoute exact path="/home/receipts" component={Receipts} />
            <ProtectedRoute exact path="/home/" component={Home} />
          </Switch>

          { alert.get('visible') ?  <Alert /> : <div /> }
        </div>
      </Router>
    )
  }
}

export default App;
