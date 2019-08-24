
import React from 'react';
import { LoggedInAppState } from '../clientTypes';


export default function Profile({state: {user}}: {state: LoggedInAppState}){
  return (
    <article>
      <h2>Profile Page for {user.name} </h2>
    </article>
  );
}
