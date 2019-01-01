import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from 'App/login';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
      </Router>
    )
  }
}

export default App;
