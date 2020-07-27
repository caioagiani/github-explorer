import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/repository/:repositorie+" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
