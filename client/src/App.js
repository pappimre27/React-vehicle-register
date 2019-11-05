import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import VehicleState from './context/vehicle/VehicleState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <AuthState>
        <VehicleState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </VehicleState>
      </AuthState>
    </Provider>
  );
};

export default App;
