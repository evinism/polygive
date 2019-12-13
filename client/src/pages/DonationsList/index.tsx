import React, { useState, useEffect } from 'react';
import DonationForm from '../../components/DonationForm';
import { getDonations } from '../../api';
import { ListDonationsResponse }from '../../../../server/shared/polygiveApi';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { Card } from '../../components/UIElements';


const initialState: ListDonationsResponse = {
  donations: [],
  charities: {},
};

export default function DonationsList(_: PageProps<LoggedInAppState>){
  const [state, setState] = useState(initialState);
  useEffect(() => {
    getDonations().then(data => setState(data));
  }, []);
  return (
    <>
      <h2>Donations</h2>
      <Card>
        {state.donations.map(donation => {
          const charity = state.charities[donation.charityId];
          return (
            <div key={donation.id}>
              Donation to {charity.name}: ${donation.amount}
            </div>
          );
        })}
        <DonationForm />
      </Card>
    </>
  );
}