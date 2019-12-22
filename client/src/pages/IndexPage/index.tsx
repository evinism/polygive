import React from 'react';
import Portfolio from '../Portfolio';
import LandingPage from '../LandingPage';
import { PageProps, AppState } from '../../clientTypes';
import Home from '../../layouts/Home';
import PublicBarebones from '../../layouts/PublicBarebones';

export default function IndexPage(props: PageProps<AppState>){

  // How is this getting past typescript?
  if(props.state && props.state.status === 'LOGGED_IN') {
    return (
      <Home state={props.state} match={props.match}>
        <Portfolio
          state={props.state}
          match={props.match} />
      </Home>
    )
  }
  return (
    <PublicBarebones state={props.state} match={props.match}>
      <LandingPage
        state={props.state}
        match={props.match} />
    </PublicBarebones>
  )
}
