import React, { useState, useEffect, FunctionComponent } from 'react';
import DonationForm from '../DonationForm';
import { ListDonationsResponse, DonationRecord, ShortCharityRecord }from '../../../../server/shared/polygiveApi';
import { Card } from '../UIElements';

interface DonationListProps {
  charities: {
    [id: string]: ShortCharityRecord
  },
  donations: DonationRecord[],
}

export const DonationsList: FunctionComponent<DonationListProps> = ({donations, charities}) => (
  <>
    {
      donations.map(donation => {
        const charity = charities[parseInt(donation.charityId, 10)];
        return (
          <div key={donation.id}>
            Donation to {charity.name}: ${donation.amount}
          </div>
        );
      })
    }
  </>
);

interface DonationListFromApiFnProps {
  apiFn: () => Promise<ListDonationsResponse>
}

const initialState: ListDonationsResponse = {
  donations: [],
  charities: {},
};

export const DonationsListFromApiFn: FunctionComponent<DonationListFromApiFnProps> = ({ apiFn }) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    apiFn().then(data => setState(data));
  }, []);
  return (
    <DonationsList donations={state.donations} charities={state.charities} />
  );
};

export default DonationsList;
