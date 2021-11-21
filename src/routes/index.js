import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { ContextProvider } from '../context/authContext';
import { Redirect } from 'react-router';
import CustomRoute from './CustomRoute';

import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import CreateUsers from '../pages/users/CreateUsers';
import ListUsers from '../pages/users/ListUsers';
import ListEmployees from '../pages/employees/ListEmployees';
import CreateEmployees from '../pages/employees/CreateEmployees';
import ListClients from '../pages/clients/ListClients';
import CreateClients from '../pages/clients/CreateClients';
import ListActivities from '../pages/activities/ListActivities';
import CreateActivities from '../pages/activities/CreateActivities';

class Router extends Component {
  render() {
    return (
      <ContextProvider>
        <Switch>
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/dashboard" component={Dashboard} isPrivate />
          <CustomRoute exact path="/usuarios" component={ListUsers} isPrivate />
          <CustomRoute exact path="/usuarios/:id" component={CreateUsers} isPrivate />
          <CustomRoute exact path="/funcionarios" component={ListEmployees} isPrivate />
          <CustomRoute exact path="/funcionarios/:id" component={CreateEmployees} isPrivate />
          <CustomRoute exact path="/clientes" component={ListClients} isPrivate />
          <CustomRoute exact path="/clientes/:id" component={CreateClients} isPrivate />
          <CustomRoute exact path="/atividades" component={ListActivities} isPrivate />
          <CustomRoute exact path="/atividades/:id" component={CreateActivities} isPrivate />
          <Redirect from="*" to={'/dashboard'} />
        </Switch>
      </ContextProvider>
    );
  }
}

export default Router;
