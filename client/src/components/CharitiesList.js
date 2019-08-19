import React, {useState, useEffect} from 'react';
import {getCharities} from '../api.js';

export default function CharitiesList(){
  const [charities, setCharities] = useState([]);
  useEffect(() => {
    getCharities().then(setCharities);
  }, []);
  return (
    <div>
      Charities:
      {charities.map(charity => (
        <div>{charity.title}</div>
      ))}    
    </div>
  );
}