import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../components/Header';
import {withProps} from '../components/Util';
import tabs from '../tabs';
import SuperPanel from '../pages/SuperPanel';
import Profile from '../pages/Profile';
import {LoggedInAppState} from '../clientTypes';

export default function Routes({ state }: {state: LoggedInAppState}) {
  const user = state.user;
  const withState = withProps({ state });
  return (
    <Router>
      <Header state={state} />
      {tabs.map(tab => (
        <Route 
          path={tab.path} 
          exact={tab.exact}
          component={withState(tab.component)} />
      ))}
      <Route path='/profile' component={withState(Profile)} />
      {user.isSuper && <Route path='/superpanel' component={withState(SuperPanel)} />}
    </Router>
  );
}
