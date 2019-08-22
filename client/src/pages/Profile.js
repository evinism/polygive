
import React from 'react';


export default function Profile({state: {user}}){
  return (
    <article>
      <h2>Profile Page for {user.name} </h2>
    </article>
  );
}
