import React from 'react';
import { PageProps, LoggedInAppState } from '../../clientTypes';

export default function CharityDescription(props: PageProps<LoggedInAppState>){
  const id = props.match.params.id as string; // oof on this 
  return (
    <div className="charity-description">
      <h2>Charity ID: {id}</h2>
    </div>
  );
}
