import React, { FunctionComponent } from "react";
import { DonationRecurrence } from "../../shared/entityRecords";
import { formatMonetaryAmount, Currency } from "../../shared/money";
import "./DonationScheduleAmount.css";

const timeDurationLabel: { [key in DonationRecurrence]: string } = {
  WEEKLY: " / wk.",
  MONTHLY: " / mo.",
  YEARLY: " / yr."
};

interface DonationScheduleAmountProps {
  amount: number;
  currency: Currency;
  recurrence: DonationRecurrence;
}

const DonationScheduleAmount: FunctionComponent<DonationScheduleAmountProps> = ({
  amount,
  currency,
  recurrence
}) => (
  <div className="donation-schedule-amount">
    {formatMonetaryAmount(amount, currency)}
    <span className="recurrence">{timeDurationLabel[recurrence]}</span>
  </div>
);

export default DonationScheduleAmount;
