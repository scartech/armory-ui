import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  Container,
  Paper,
} from '@material-ui/core';
import {
  lightBlue,
  deepPurple,
  deepOrange,
  orange,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import PubSub from 'pubsub-js';
import {
  Home,
  Ammo,
  AmmoItem,
  Admin,
  Profile,
  Signin,
  Gun,
  User,
  Pictures,
  History,
  EditHistory,
} from './pages';
import { PrivateRoute, NavBar } from './components';
import { ProvideAuth } from './hooks';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    flexGrow: 1,
    overflow: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: lightBlue[500],
      },
    },
    typography: {
      fontFamily: 'Quicksand',
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: deepOrange[900],
      },
      type: 'dark',
    },
    typography: {
      fontFamily: 'Quicksand',
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  useEffect(() => {
    setDarkState(localStorage.getItem('darkState') === 'true');
  }, []);

  const handleThemeChange = () => {
    localStorage.setItem('darkState', !darkState);
    setDarkState(!darkState);
  };

  PubSub.subscribe('UNAUTHORIZED', () => {
    setLoggedOut(true);
  });

  return (
    <>
      <Router>
        <ThemeProvider theme={darkState ? darkTheme : lightTheme}>
          <ProvideAuth>
            <Paper className={classes.root}>
              {!loggedOut && (
                <NavBar
                  handleThemeChange={handleThemeChange}
                  darkState={darkState}
                />
              )}
              <Container maxWidth="xl">
                <Switch>
                  <PrivateRoute path="/" component={Home} exact />
                  <Route path="/login" component={Signin} />
                  <PrivateRoute path="/gun" component={Gun} exact />
                  <PrivateRoute path="/images/:id" component={Pictures} exact />
                  <PrivateRoute path="/gun/:id" component={Gun} exact />
                  <PrivateRoute path="/ammo" component={Ammo} exact />
                  <PrivateRoute path="/ammo/item" component={AmmoItem} exact />
                  <PrivateRoute
                    path="/ammo/item/:id"
                    component={AmmoItem}
                    exact
                  />
                  <PrivateRoute
                    path="/gun/:gunId/history"
                    component={History}
                    exact
                  />
                  <PrivateRoute
                    path="/history/:gunId"
                    component={EditHistory}
                    exact
                  />
                  <PrivateRoute
                    path="/history/:gunId/:id"
                    component={EditHistory}
                    exact
                  />
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
                {loggedOut && <Redirect to={{ pathname: '/login' }} />}
              </Container>
            </Paper>
          </ProvideAuth>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
