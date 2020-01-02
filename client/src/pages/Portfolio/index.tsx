import React, { useState, useEffect } from 'react';
import DonationScheduleForm from '../../components/DonationScheduleForm';
import { getDonationSchedules, patchDonationSchedule } from '../../api';
import { ListDonationSchedulesResponse, DonationRecurrence, DonationScheduleRecord } from '../../../../server/shared/polygiveApi';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { PaddedList, WaitForLoaded } from '../../components/UIElements';
import DonationScheduleAmount from './DonationScheduleAmount';
import DSLineItem from './DSLineItem';
import './Portfolio.css';

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
              <PaddedList items={state.donationSchedules.map(donationSchedule => {
                const charity = state.charities[donationSchedule.charityId];
                return (
                  <DSLineItem
                    onEdit={async (record: DonationScheduleRecord) => {
                      const newRecord = await patchDonationSchedule(record);
                      // We really should make donation schedules into a setlike
                      const newState: ComponentState = {
                        donationSchedules: [
                          ...state.donationSchedules
                            .filter(record => record.id !== newRecord.id),
                          newRecord,
                        ],
                        charities: state.charities,
                      }
                      debugger;
                      setState(newState);
                    }}
                    key={donationSchedule.id}
                    charity={charity}
                    donationSchedule={donationSchedule} />
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