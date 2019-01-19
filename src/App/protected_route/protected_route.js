import React, { PureComponent } from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from 'Lib/helpers';
import Sidebar from 'Components/sidebar';

class ProtectedRoute extends PureComponent {
  componentDidMount() {
    this.props.getAccount();
  }

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
      <Sidebar>
        <Route
          {...rest}
          render={this.renderProps}
        />
      </Sidebar>
    );
  }
}

export default ProtectedRoute;
