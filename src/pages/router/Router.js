import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { ContextProvider } from '../../context/authContext';
import { Redirect } from 'react-router';
import CustomRoute from './CustomRoute';

import Login from '../Login';
import Logout from '../Logout';

class Router extends Component {
  render() {
    return (
      <ContextProvider>
        <Switch>
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/logout" component={Logout} />
          <Redirect from="*" to={'/'} />
        </Switch>
      </ContextProvider>
    );
  }
}

export default Router;
