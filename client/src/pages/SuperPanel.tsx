
import React from 'react';
import CharityForm from '../components/CharityForm';
import { LoggedInAppState } from '../clientTypes';

export default function SuperPanel(props: {state: LoggedInAppState}){
  return (
    <article>
      <h2>SuperUser controls</h2>
      <CharityForm />
    </article>
  );
}
