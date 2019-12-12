import React, {useState, useEffect} from 'react';
import { getCharities } from '../api';
import { ListCharitiesResponse } from '../../../server/shared/polygiveApi';
import DonationForm from '../components/DonationForm';
import { PageProps, LoggedInAppState } from '../clientTypes';


const initialState: ListCharitiesResponse = [];

export default function CharitiesList(_: PageProps<LoggedInAppState>){
  const [charities, setCharities] = useState(initialState);
  useEffect(() => {
    getCharities().then(data => setCharities(data));
  }, []);
  return (
    <>
      <h2>Charities</h2>
      {charities.map(charity => (
        <div key={charity.id}>
          {charity.name}
          <DonationForm charityId={charity.id} />
        </div>
      ))}    
    </>
  );
}