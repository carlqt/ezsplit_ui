import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'

import ProtectedRoute from 'App/protected_route';
import Login from 'App/login';
import Home from 'App/home';
import Receipts from 'App/receipts';
import Alert from 'Components/alerts';
import store from './store'

class App extends Component {
  render() {
    const { appStore } = store.getState();
    const alert =  appStore.get('alert');

    return (
      <Provider store={store}>
        <Router>
          <div className="routerContainer">
            <Route path="/login" component={Login} />
            <Switch>
              <ProtectedRoute path="/home/:id/receipts/new" component={Receipts} />
              <ProtectedRoute path="/home/:id" component={Home} />
              <ProtectedRoute path="/home/" component={Home} />
            </Switch>

            { alert.get('visible') ?  <Alert /> : <div /> }
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
