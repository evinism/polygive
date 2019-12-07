import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { getDonations } from '../api';
import { ListDonationsResponse } from '../../../server/shared/apiTypes';
import { PageProps, LoggedInAppState } from '../clientTypes';

const initialState: ListDonationsResponse = [];

export default function Portfolio(_: PageProps<LoggedInAppState>){
  const [donations, setDonations] = useState(initialState);
  useEffect(() => {
    getDonations().then(data => setDonations(data));
  }, []);
  return (
    <>
      <h2>Donations</h2>
      {donations.map(donation => (
        <div key={donation.id}>Charity {donation.charityId}: ${donation.amount}</div>
      ))}
      <DonationForm />
    </>
  );
}