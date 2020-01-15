import React, { useState, useEffect } from "react";
import DonationScheduleForm from "../../components/DonationScheduleForm";
import { getDonationSchedules, patchDonationSchedule } from "../../api";
import {
  ListDonationSchedulesResponse,
  DonationRecurrence,
  DonationScheduleRecord
} from "../../shared/polygiveApi";
import { PageProps, LoggedInAppState } from "../../clientTypes";
import { PaddedList, WaitForLoaded } from "../../components/UIElements";
import DonationScheduleAmount from "./DonationScheduleAmount";
import DSLineItem from "./DSLineItem";
import "./Portfolio.css";
import { Currency } from "../../shared/money";

const timeMultiplier: { [key in DonationRecurrence]: number } = {
  WEEKLY: 52,
  MONTHLY: 12,
  YEARLY: 1
};

const getYearlyContributions = (
  donationSchedules: DonationScheduleRecord[]
) => {
  const hashOfTotals = donationSchedules.reduce(
    (acc: { [key: string]: number }, cur) => {
      if (!acc[cur.currency]) {
        acc[cur.currency] = 0;
      }
      acc[cur.currency] += cur.amount * timeMultiplier[cur.recurrence];
      return acc;
    },
    {}
  );
  const totals = Object.entries(hashOfTotals).map(
    ([currency, amount]) =>
      ({
        currency,
        amount
      } as { currency: Currency; amount: number })
  );
  totals.sort(({ amount: a }, { amount: b }) => a - b);
  return totals;
};

type ComponentState = ListDonationSchedulesResponse | undefined;

export default function Portfolio(_: PageProps<LoggedInAppState>) {
  const [state, setState] = useState<ComponentState>(undefined);
  useEffect(() => {
    getDonationSchedules().then(data => setState(data));
  }, []);

  return (
    <div className="portfolio-page">
      <h2>Portfolio</h2>
      <WaitForLoaded item={state}>
        {state => {
          const contribs = getYearlyContributions(state.donationSchedules);
          return (
            <>
              <div className="yearly-contributions">
                <h3>Your yearly contributions:</h3>
                {contribs.map(({ currency, amount }) => (
                  <DonationScheduleAmount
                    amount={amount}
                    currency={currency}
                    recurrence={"YEARLY" as any}
                  />
                ))}
              </div>
              <PaddedList
                items={state.donationSchedules.map(donationSchedule => {
                  const charity = state.charities[donationSchedule.charityId];
                  return (
                    <DSLineItem
                      onEdit={async (record: DonationScheduleRecord) => {
                        const newRecord = await patchDonationSchedule(record);
                        // We really should make donation schedules into a setlike
                        const newState: ComponentState = {
                          donationSchedules: [
                            ...state.donationSchedules.filter(
                              record => record.id !== newRecord.id
                            ),
                            newRecord
                          ],
                          charities: state.charities
                        };
                        setState(newState);
                      }}
                      key={donationSchedule.id}
                      charity={charity}
                      donationSchedule={donationSchedule}
                    />
                  );
                })}
              />
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
