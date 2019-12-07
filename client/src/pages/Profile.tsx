import React from 'react';
import { PageProps, LoggedInAppState } from '../clientTypes';

export default function Profile({state: {user}}: PageProps<LoggedInAppState>){
  return (
    <>
      <h2>Profile Page for {user.name} </h2>
    </>
  );
}
