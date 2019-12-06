import React from 'react';
import { PageProps, AppState } from '../clientTypes';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default function Profile(_: PageProps<AppState>){
  return (
    <article>
      <h1>Landing Page </h1>
      <a href={apiUrl + '/auth/google'}>Log in with Google</a>
    </article>
  );
}
