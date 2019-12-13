import React, { useState, useEffect } from 'react';
import DonationScheduleForm from '../../components/DonationScheduleForm';
import Card from '../../components/Card';
import { getDonationSchedules } from '../../api';
import { ListDonationSchedulesResponse, DonationRecurrence } from '../../../../server/shared/polygiveApi';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { PaddedList } from '../../components/UIElements';
import './Portfolio.css';

const initialState: ListDonationSchedulesResponse = {
  donationSchedules: [],
  charities: {},
};

const timeDurationLabel: { [key in DonationRecurrence]: string } = {
  WEEKLY: ' / wk.',
  MONTHLY: ' / mo.',
  YEARLY: ' / yr.',
};

export default function Portfolio(_: PageProps<LoggedInAppState>){
  const [state, setState] = useState(initialState);
  useEffect(() => {
    getDonationSchedules().then(data => setState(data));
  }, []);
  return (
    <>
      <h2>Portfolio</h2>
      <Card>
        <h3>Recurring Donations</h3>
        <PaddedList items={state.donationSchedules.map(donation => {
          const charity = state.charities[donation.charityId];
          return (
            <div key={donation.id} className="donation-schedule">
              <h4>{charity.name}</h4>
              <div>
                ${donation.amount}
                <span className="recurrence">
                  {timeDurationLabel[donation.recurrence]}
                </span>
              </div>
            </div>
          );
        })} />
        <DonationScheduleForm />
      </Card>
    </>
  );
}