import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { getDonationSchedules } from '../api';
import { ListDonationSchedulesResponse }from '../../../server/shared/polygiveApi';
import { PageProps, LoggedInAppState } from '../clientTypes';

const initialState: ListDonationSchedulesResponse = {
  donationSchedules: [],
  charities: {},
};

export default function Portfolio(_: PageProps<LoggedInAppState>){
  const [state, setState] = useState(initialState);
  useEffect(() => {
    getDonationSchedules().then(data => setState(data));
  }, []);
  return (
    <>
      <h2>Portfolio</h2>
      {state.donationSchedules.map(donation => {
        const charity = state.charities[donation.charityId];
        return (
          <div key={donation.id}>
            Recurring donation to {charity.name}: ${donation.amount}
          </div>
        );
      })}
    </>
  );
}