import React from 'react';
import { getDonations } from '../../api';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { DonationsListFromApiFn } from '../../components/DonationList';
import { Card } from '../../components/UIElements';
import DonationForm from '../../components/DonationForm';

export default function DonationsList(_: PageProps<LoggedInAppState>){
  return (
    <>
      <h2>Donations</h2>
      <Card>
        <DonationsListFromApiFn apiFn={getDonations} />
        <DonationForm />
      </Card>
    </>
  );
}