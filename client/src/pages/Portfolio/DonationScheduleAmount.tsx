import React, { FunctionComponent } from 'react';
import { DonationRecurrence } from '../../../../server/shared/polygiveApi';
import './DonationScheduleAmount.css';

const timeDurationLabel: { [key in DonationRecurrence]: string } = {
  WEEKLY: ' / wk.',
  MONTHLY: ' / mo.',
  YEARLY: ' / yr.',
};

interface DonationScheduleAmountProps {
  amount: number;
  recurrence: DonationRecurrence;
}

const DonationScheduleAmount: FunctionComponent<DonationScheduleAmountProps> = ({amount, recurrence}) => (
  <div className="donation-schedule-amount">
    ${amount}
    <span className="recurrence">
      {timeDurationLabel[recurrence]}
    </span>
  </div>
);

export default DonationScheduleAmount;
