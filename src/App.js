import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Admin, Profile, Signin } from './pages';
import { useToken } from './hooks';
import { PrivateRoute, NavBar } from './components';

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Signin setToken={setToken} />;
  }

  return (
    <Router>
      <div>
        <NavBar />
      </div>
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <PrivateRoute path="/admin" roles={['ADMIN']} component={Admin} />
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
