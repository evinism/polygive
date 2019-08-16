
import React from 'react';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default function LoggedOut(){
  return (
    <header>
      <p>
        Polygive.
      </p>
      <a href={apiUrl + '/auth/google'}>Log in with Google</a>
    </header>
  );
}
