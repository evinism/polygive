import React from 'react';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default function LogInToContinue(){
  return (
    <>
      <h1>
        Polygive.
      </h1>
      <h2>Log in to continue</h2>
      <a href={apiUrl + '/auth/google'}>Log in with Google</a>
    </>
  );
}
