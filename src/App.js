import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, Container } from '@material-ui/core';
import { Home, Admin, Profile, Signin, Gun } from './pages';
import { PrivateRoute, NavBar } from './components';
import { ProvideAuth } from './hooks/provideAuth';
import { theme } from './utils';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <Router>
          <NavBar />
          <Container maxWidth="md">
            <Switch>
              <PrivateRoute path="/" component={Home} exact />
              <Route path="/login" component={Signin} />
              <PrivateRoute path="/gun/:id" component={Gun} exact />
              <PrivateRoute
                path="/admin"
                roles={['ADMIN']}
                component={Admin}
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
