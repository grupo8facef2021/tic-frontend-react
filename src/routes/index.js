import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { ContextProvider } from '../context/authContext';
import { Redirect } from 'react-router';
import CustomRoute from './CustomRoute';

import CreateUsers from '../pages/users/CreateUsers';
import ListUsers from '../pages/users/ListUsers';
import Employees from '../pages/employees/Employees';
import Login from '../pages/login/Login';

class Router extends Component {
  render() {
    return (
      <ContextProvider>
        <Switch>
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/create-users" component={CreateUsers} isPrivate />
          <CustomRoute exact path="/list-users" component={ListUsers} isPrivate />
          <CustomRoute exact path="/employees" component={Employees} isPrivate />
          <Redirect from="*" to={'/'} />
        </Switch>
      </ContextProvider>
    );
  }
}

export default Router;
