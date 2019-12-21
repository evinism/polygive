
import React from 'react';
import CharityForm from '../../components/CharityForm';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { DonationsListFromApiFn } from '../../components/DonationList';
import {getUnflushedDonations} from '../../api';

export default function SuperPanel(_: PageProps<LoggedInAppState>){
  return (
    <>
      <h2>SuperUser controls</h2>
      <h3>Create a charity</h3>
      <CharityForm />
      <h3>Paid, Unflushed Donations</h3>
      <DonationsListFromApiFn apiFn={getUnflushedDonations} />
    </>
  );
}
