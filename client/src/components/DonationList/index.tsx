import React, { useState, useEffect, FunctionComponent } from "react";
import {
  ListDonationsResponse,
  DonationRecord,
  ShortCharityRecord
} from "../../../../server/shared/polygiveApi";
import { PaddedList, WaitForLoaded } from "../UIElements";
import { formatMonetaryAmount } from "../../money";

interface DonationListProps {
  charities: {
    [id: string]: ShortCharityRecord;
  };
  donations: DonationRecord[];
}

export const DonationsList: FunctionComponent<DonationListProps> = ({
  donations,
  charities
}) => (
  <PaddedList
    items={donations.map(donation => {
      const charity = charities[donation.charityId];
      return (
        <div className="donation-li" key={donation.id}>
          Donation to {charity.name}:
          {formatMonetaryAmount(donation.amount, donation.currency)}
        </div>
      );
    })}
  />
);

interface DonationListFromApiFnProps {
  apiFn: () => Promise<ListDonationsResponse>;
}

export const DonationsListFromApiFn: FunctionComponent<DonationListFromApiFnProps> = ({
  apiFn
}) => {
  const [state, setState] = useState<ListDonationsResponse | undefined>(
    undefined
  );
  useEffect(() => {
    apiFn().then(data => setState(data));
  }, []);
  return (
    <WaitForLoaded item={state}>
      {state => (
        <DonationsList
          donations={state.donations}
          charities={state.charities}
        />
      )}
    </WaitForLoaded>
  );
};

export default DonationsList;
