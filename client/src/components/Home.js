import React from 'react';

export default function Home({user}){
  return (
    <header>
      <p>
        Welcome, {user.name}
      </p>
    </header>
  );
}
