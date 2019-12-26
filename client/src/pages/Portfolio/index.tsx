import React, { useState, useEffect } from 'react';
import DonationScheduleForm from '../../components/DonationScheduleForm';
import { getDonationSchedules } from '../../api';
import { ListDonationSchedulesResponse, DonationRecurrence } from '../../../../server/shared/polygiveApi';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { PaddedList, WaitForLoaded } from '../../components/UIElements';
import DonationScheduleAmount from './DonationScheduleAmount';
import './Portfolio.css';
import Dropdown, { DropdownLink } from '../../components/Dropdown';

const timeMultiplier: { [key in DonationRecurrence]: number } = {
  WEEKLY: 52,
  MONTHLY: 12,
  YEARLY: 1,
}

type ComponentState = ListDonationSchedulesResponse|undefined;

export default function Portfolio(_: PageProps<LoggedInAppState>){
  const [state, setState] = useState<ComponentState>(undefined);
  useEffect(() => {
    getDonationSchedules().then(data => setState(data));
  }, []);

  return (
    <div className="portfolio-page">
      <h2>Portfolio</h2>
      <WaitForLoaded item={state}>
        {(state) => {
          // TODO: Convert the over-the-wire numbers to be in cents or something
          const yearlyContributions = 
            state
            .donationSchedules
            .reduce(
              (acc, cur) => acc
                + parseFloat(cur.amount)
                * timeMultiplier[cur.recurrence],
              0
            );
          return (
            <>
              <div className="yearly-contributions">
                <h3>Your yearly contributions:</h3>
                <DonationScheduleAmount 
                  amount={yearlyContributions}
                  recurrence={'YEARLY' as any} />
              </div>
              <PaddedList items={state.donationSchedules.map(donation => {
                const charity = state.charities[donation.charityId];
                return (
                  <div key={donation.id} className="donation-schedule">
                    <h4>{charity.name}</h4>
                    <DonationScheduleAmount 
                      amount={parseFloat(donation.amount)}
                      recurrence={donation.recurrence} />
                    <Dropdown contents={[
                      <>
                        <DropdownLink to='/profile'>Edit</DropdownLink>
                        <DropdownLink to='/payment'>Delete</DropdownLink>
                      </>]
                    }>
                      <div className='triple-dot'>⋮</div>
                    </Dropdown>
                  </div>
                );
              })} />
              <div className="schedule-form-wrapper">
                <DonationScheduleForm />
              </div>
            </>
          );
        }}
      </WaitForLoaded>
    </div>
  );
}