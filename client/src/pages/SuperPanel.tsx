
import React from 'react';
import CharityForm from '../components/CharityForm';
import { PageProps, LoggedInAppState } from '../clientTypes';

export default function SuperPanel(_: PageProps<LoggedInAppState>){
  return (
    <article>
      <h2>SuperUser controls</h2>
      <CharityForm />
    </article>
  );
}
