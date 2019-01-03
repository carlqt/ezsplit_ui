import React, { PureComponent } from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from 'Lib/helpers';

class ProtectedRoute extends PureComponent {
  renderProps = () => {
    const { component: Component, location } = this.props;

    if (isAuthenticated()) {
      return <Component {...this.props} />;
    };

    return(
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    );
  }

  render() {
    const { component, ...rest } = this.props;

    return(
      <Route
        {...rest}
        render={this.renderProps}
      />
    );
  }
}

export default ProtectedRoute;
