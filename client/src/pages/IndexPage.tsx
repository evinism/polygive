import React from 'react';
import DonationsList from './DonationsList';
import LandingPage from './LandingPage';
import { PageProps, AppState } from '../clientTypes';
import Home from '../layouts/Home';

export default function IndexPage(props: PageProps<AppState>){

  // How is this getting past typescript?
  if(props.state && props.state.status === 'LOGGED_IN') {
    return (
      <Home state={props.state}>
        <DonationsList state={props.state} />
      </Home>
    )
  }
  return (
    <LandingPage state={props.state} />
  )
}
