import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  ThemeProvider,
  StyledEngineProvider,
  Container,
  Paper,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import PubSub from 'pubsub-js';
import {
  Guns,
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
  Home,
  LoginMFA,
  Inventory,
  InventoryItem,
  RangeDays,
  RangeDay,
  Settings,
} from './pages';
import { PrivateRoute, NavBar } from './components';
import { ProvideAuth, useDarkMode } from './hooks';

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

  const { isDark: sysDark } = useDarkMode();

  useEffect(() => {
    const appearance = localStorage.getItem('appearance') ?? 'Auto';
    if (appearance === 'Auto') {
      setDarkState(sysDark);
    } else {
      setDarkState(appearance === 'Dark');
    }
  }, [sysDark]);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#1E40AF',
        light: '#3B82F6',
        dark: '#1E3A8A',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#1E3A8A',
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
        main: '#F9FAFB',
      },
      secondary: {
        main: '#ECFDF5',
      },
      mode: 'dark',
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

  PubSub.subscribe('THEME-CHANGE', (msg, msgData) => {
    setDarkState(msgData.isDark);
  });

  PubSub.subscribe('UNAUTHORIZED', () => {
    setLoggedOut(true);
  });

  return (
    <>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkState ? darkTheme : lightTheme}>
            <ProvideAuth>
              <Paper className={classes.root}>
                {!loggedOut && <NavBar />}
                <Container maxWidth="xl">
                  <Switch>
                    <Route path="/login" component={Signin} />
                    <Route path="/login-mfa" component={LoginMFA} exact />
                    <PrivateRoute path="/" component={Home} exact />
                    <PrivateRoute path="/guns" component={Guns} exact />
                    <PrivateRoute path="/gun" component={Gun} exact />
                    <PrivateRoute
                      path="/images/:id"
                      component={Pictures}
                      exact
                    />
                    <PrivateRoute path="/gun/:id" component={Gun} exact />
                    <PrivateRoute path="/ammo" component={Ammo} exact />
                    <PrivateRoute path="/rangeday" component={RangeDay} exact />
                    <PrivateRoute
                      path="/rangeday/:id"
                      component={RangeDay}
                      exact
                    />
                    <PrivateRoute
                      path="/rangedays"
                      component={RangeDays}
                      exact
                    />
                    <PrivateRoute
                      path="/inventory"
                      component={Inventory}
                      exact
                    />
                    <PrivateRoute
                      path="/inventory/item"
                      component={InventoryItem}
                      exact
                    />
                    <PrivateRoute
                      path="/inventory/item/:id"
                      component={InventoryItem}
                      exact
                    />
                    <PrivateRoute
                      path="/ammo/item"
                      component={AmmoItem}
                      exact
                    />
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
                    <PrivateRoute path="/settings" component={Settings} exact />
                  </Switch>
                  {loggedOut && <Redirect to={{ pathname: '/login' }} />}
                </Container>
              </Paper>
            </ProvideAuth>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </>
  );
}

export default App;
