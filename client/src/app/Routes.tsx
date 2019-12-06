import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { pageManifest } from '../appData';
import { makeLayoutFn, identity } from '../util';
import PageNotFound from '../pages/PageNotFound';
import { AppState, LoggedOutPageMetadata, LoggedInPageMetadata, PageMetadata } from '../clientTypes';

const pageManifestArr = Object.values(pageManifest);

// This is annoying because we don't have a good way of ensuring these are 
// mutually exclusive and not typecasted
const publicPages = pageManifestArr
  .filter(page => page.public) as LoggedOutPageMetadata[];
const loggedInPages = pageManifestArr
  .filter(page => !page.public && !page.super) as LoggedInPageMetadata[];
const superPages = pageManifestArr
  .filter(page => !page.public && page.super) as LoggedInPageMetadata[];

// Okay there is SO MUCH repetition in here to ensure that the types line up.
// It's a good thing I like playing around with types so much.
export default function Routes({ state }: {state: AppState}) {
  return (
    <Router>
      <Switch>
        {publicPages.map(page => {
          const layoutFn = page.layout
            ? makeLayoutFn(page.layout)
            : identity;
          return (
            <Route 
              path={page.path} 
              exact={page.exact}
              component={layoutFn(page.component, state)} />
          );
        })}
        {state.status === 'LOGGED_IN' && loggedInPages.map(page => {
          const layoutFn = page.layout
            ? makeLayoutFn(page.layout)
            : identity;
          return (
            <Route 
              path={page.path} 
              exact={page.exact}
              component={layoutFn(page.component, state)} />
          );
        })}
        { state.status === 'LOGGED_IN' && state.user.isSuper === true && superPages.map(page => {
          const layoutFn = page.layout
            ? makeLayoutFn(page.layout)
            : identity;
          return (
            <Route 
              path={page.path} 
              exact={page.exact}
              component={layoutFn(page.component, state)} />
          );
        })}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
