import React from 'react';
import Portfolio from '../Portfolio';
import LandingPage from '../LandingPage';
import { PageProps, AppState } from '../../clientTypes';
import Home from '../../layouts/Home';

export default function IndexPage(props: PageProps<AppState>){

  // How is this getting past typescript?
  if(props.state && props.state.status === 'LOGGED_IN') {
    return (
      <Home state={props.state}>
        <Portfolio state={props.state} />
      </Home>
    )
  }
  return (
    <LandingPage state={props.state} />
  )
}
