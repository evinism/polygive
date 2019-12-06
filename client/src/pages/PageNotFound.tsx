import React from 'react';
import { PageProps, AppState } from '../clientTypes';

export default function PageNotFound(_: PageProps<AppState>){
  return (
    <article>
      <h2>No page found here!!</h2>
    </article>
  );
}
