import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Admin, Profile, Signin } from './pages';
import { PrivateRoute, NavBar } from './components';
import { ProvideAuth } from './hooks/provideAuth';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login">
            <Signin />
          </Route>
          <PrivateRoute
            path="/admin"
            exact
            roles={['ADMIN']}
            component={Admin}
          />
          <PrivateRoute path="/profile" exact component={Profile} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
