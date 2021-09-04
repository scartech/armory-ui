import { Route, Redirect } from 'react-router-dom';
import { AuthService } from '../services';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
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

export { PrivateRoute };
