import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import tabs from './tabs';
import Home from '../layouts/Home';
import SuperPanel from '../pages/SuperPanel';
import Profile from '../pages/Profile';
import { makeLayoutFn } from '../components/Util';
import { LoggedInAppState } from '../clientTypes';

const homeLayout = makeLayoutFn(Home);

export default function Routes({ state }: {state: LoggedInAppState}) {
  const user = state.user;
  return (
    <Router>
      {tabs.map(tab => (
        <Route 
          path={tab.path} 
          exact={tab.exact}
          component={homeLayout(tab.component, state)} />
      ))}
      <Route path='/profile' component={homeLayout(Profile, state)} />
      {user.isSuper && <Route path='/superpanel' component={homeLayout(SuperPanel, state)} />}
    </Router>
  );
}
