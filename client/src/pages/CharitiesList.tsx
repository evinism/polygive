import React, {useState, useEffect} from 'react';
import {getCharities} from '../api';
import {CharityResponse} from '../apiTypes'; 
import DonationForm from '../components/DonationForm';
import { LoggedInAppState } from '../clientTypes';


const initialState: CharityResponse = [];

export default function CharitiesList(props: {state: LoggedInAppState}){
  const [charities, setCharities] = useState(initialState);
  useEffect(() => {
    getCharities().then(data => setCharities(data));
  }, []);
  return (
    <article>
      <h2>Charities</h2>
      {charities.map(charity => (
        <div key={charity.id}>
          {charity.title}
          <DonationForm charityId={charity.id} />
        </div>
      ))}    
    </article>
  );
}