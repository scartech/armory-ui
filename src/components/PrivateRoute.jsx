/* eslint-disable react/prop-types */
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthService } from '../services';

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = AuthService.getUser();
        if (!user) {
          // The user is not logged in
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        if (user.totpEnabled && user.totpValidated && !user.totpLoggedIn) {
          // The user needs to supply the second auth factor
          return (
            <Redirect
              to={{ pathname: '/login-mfa', state: { from: props.location } }}
            />
          );
        }

        // Check if route is restricted by a role
        if (roles && roles.indexOf(user.role) === -1) {
          // The user doesn't have permission, so redirect to the home page
          return <Redirect to={{ pathname: '/' }} />;
        }

        // The user has access, so return the component
        return <Component {...props} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  roles: PropTypes.array,
};

PrivateRoute.defaultProps = {
  roles: undefined,
};

export default PrivateRoute;
