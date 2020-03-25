import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Logon} path="/" exact/>
        <Route component={Register} path="/register" />
        <Route component={Profile} path="/profile" />
        <Route component={NewIncident} path="/incidents/new" />
      </Switch>
    </BrowserRouter>
  )
}