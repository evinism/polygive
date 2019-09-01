
import React from 'react';
import CharityForm from '../components/CharityForm';
import { PageProps } from '../clientTypes';

export default function SuperPanel(_: PageProps){
  return (
    <article>
      <h2>SuperUser controls</h2>
      <CharityForm />
    </article>
  );
}
