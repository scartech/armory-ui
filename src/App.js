import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, Container } from '@material-ui/core';
import { Home, Admin, Profile, Signin, Gun, User } from './pages';
import { PrivateRoute, NavBar } from './components';
import { ProvideAuth } from './hooks/provideAuth';
import { theme } from './utils';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <Router>
          <NavBar />
          <Container maxWidth="lg">
            <Switch>
              <PrivateRoute path="/" component={Home} exact />
              <Route path="/login" component={Signin} />
              <PrivateRoute path="/gun" component={Gun} exact />
              <PrivateRoute path="/gun/:id" component={Gun} exact />
              <PrivateRoute
                path="/admin"
                roles={['ADMIN']}
                component={Admin}
                exact
              />
              <PrivateRoute
                path="/user"
                roles={['ADMIN']}
                component={User}
                exact
              />
              <PrivateRoute
                path="/user/:id"
                roles={['ADMIN']}
                component={User}
                exact
              />
              <PrivateRoute path="/profile" component={Profile} exact />
            </Switch>
          </Container>
        </Router>
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;
