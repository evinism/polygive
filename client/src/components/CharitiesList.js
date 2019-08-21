import React, {useState, useEffect} from 'react';
import {getCharities} from '../api.js';

export default function CharitiesList(){
  const [charities, setCharities] = useState([]);
  useEffect(() => {
    getCharities().then(setCharities);
  }, []);
  return (
    <article>
      <h2>Charities</h2>
      {charities.map(charity => (
        <div key={charity.id}>
          {charity.title}
        </div>
      ))}    
    </article>
  );
}