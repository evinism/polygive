
import React from 'react';
import { PageProps } from '../clientTypes';

export default function Profile({state: {user}}: PageProps){
  return (
    <article>
      <h2>Profile Page for {user.name} </h2>
    </article>
  );
}
