import React, { PureComponent } from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from 'Lib/helpers';
import Sidebar from 'Components/sidebar';
import { currentHouse } from 'Lib/helpers';

class ProtectedRoute extends PureComponent {
  componentDidMount() {
    if (isAuthenticated()) {
      const { id } = currentHouse();
      const {
        getCurrentHouse,
        getAccount,
      } = this.props;

      if (id) { getCurrentHouse() };
      getAccount();
    }
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
    const { logout, component, ...rest } = this.props;

    return(
      <Sidebar
        {...{ logout }}
      >
        <Route
          {...rest}
          render={this.renderProps}
        />
      </Sidebar>
    );
  }
}

export default ProtectedRoute;
