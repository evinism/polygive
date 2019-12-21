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

const timeMultiplier: { [key in DonationRecurrence]: number } = {
  WEEKLY: 52,
  MONTHLY: 12,
  YEARLY: 1,
}

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

  // TODO: Convert the over-the-wire numbers to be in cents or something.
  const yearlyContributions = state.donationSchedules.reduce((acc, cur) => {
    return acc + parseFloat(cur.amount) * timeMultiplier[cur.recurrence];
  }, 0);
  return (
    <div className="portfolio-page">
      <Card>
        <div className="card-inner">
          <div className="yearly-contributions">
            <h3>Your yearly contributions:</h3>
            <div className="donation-schedule-amount">
              ${yearlyContributions.toFixed(2)}
              <span className="recurrence">
                {" / yr "}
              </span>
            </div>
          </div>
          <PaddedList items={state.donationSchedules.map(donation => {
            const charity = state.charities[donation.charityId];
            return (
              <div key={donation.id} className="donation-schedule">
                <h4>{charity.name}</h4>
                <div className="donation-schedule-amount">
                  ${donation.amount}
                  <span className="recurrence">
                    {timeDurationLabel[donation.recurrence]}
                  </span>
                </div>
              </div>
            );
          })} />
          <div className="schedule-form-wrapper">
            <DonationScheduleForm />
          </div>
        </div>
      </Card>
    </div>
  );
}