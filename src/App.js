import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { Home, Admin, Profile, Signin, Gun, User } from './pages';
import { PrivateRoute, NavBar } from './components';
import { ProvideAuth } from './hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexGrow: 1,
    overflow: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);

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

  return (
    <ThemeProvider theme={darkState ? darkTheme : lightTheme}>
      <ProvideAuth>
        <Paper className={classes.root}>
          <Router>
            <NavBar
              handleThemeChange={handleThemeChange}
              darkState={darkState}
            />
            <Container>
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
        </Paper>
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;
