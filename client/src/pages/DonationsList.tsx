import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { getDonations } from '../api';
import { ListDonationsResponse } from '../../../server/shared/apiTypes';
import { LoggedInAppState } from '../clientTypes';

const initialState: ListDonationsResponse = [];

export default function DonationsList(props: {state: LoggedInAppState}){
  const [donations, setDonations] = useState(initialState);
  useEffect(() => {
    getDonations().then(data => setDonations(data));
  }, []);
  return (
    <article>
      <h2>Donations</h2>
      {donations.map(donation => (
        <div key={donation.id}>Charity {donation.charityId}: ${donation.amount}</div>
      ))}
      <DonationForm />
    </article>
  );
}