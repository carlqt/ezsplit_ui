import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProtectedRoute from 'App/protected_route';
import Login from 'App/login';
import Home from 'App/home';
import Receipts from 'App/receipts';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="routerContainer">
          <Route path="/login" component={Login} />
          <Switch>
            <ProtectedRoute path="/home/:id" component={Home} />
            <ProtectedRoute path="/home/" component={Home} />
          </Switch>

          <Route path="/receipts/new" component={Receipts} />
        </div>
      </Router>
    )
  }
}

export default App;
