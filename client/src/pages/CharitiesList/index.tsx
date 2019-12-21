import React, {useState, useEffect} from 'react';
import { getCharities } from '../../api';
import { ListCharitiesResponse } from '../../../../server/shared/polygiveApi';
import DonationForm from '../../components/DonationForm';
import { Card } from '../../components/UIElements';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import DonationScheduleForm from '../../components/DonationScheduleForm';

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
        <Card>
          <div key={charity.id}>
            <h3>{charity.name}</h3>
            <DonationForm charityId={charity.id} />
            <DonationScheduleForm charityId={charity.id} />
          </div>
        </Card>
      ))}    
    </>
  );
}