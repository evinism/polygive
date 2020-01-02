import React, {useState, FormEvent} from 'react';
import {createDonationSchedule} from '../api';
import { DonationRecurrence } from '../../../server/shared/polygiveApi';

const recurrenceLabel: { [key in DonationRecurrence]: string } = {
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
};


export default function DonationScheduleForm({charityId: parentCharityId}: {charityId?: number}) {
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = (event.target as any).amount.value as string;
    const charityId = parentCharityId ||
      parseInt((event.target as any).charityId.value as string, 10);
    const recurrence = (event.target as any).recurrence.value as DonationRecurrence;
    createDonationSchedule(charityId, amount, recurrence).then(() => setEnabled(false));
  };

  return enabled ? (
    <div>
      <form onSubmit={handleSubmit}>
        {!parentCharityId && (
          <label>
            Charity Id: <input name="charityId" type="text" />
          </label>
        )}
        <label>
          $<input name="amount" type="number" />
        </label>
        <label>
          Recurrence:
          <select name="recurrence">
            {Object.entries(recurrenceLabel).map((entry) => (
              <option value={entry[0]}>
                {entry[1]}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => setEnabled(false)}>Close</button>
    </div> 
  ) : (
    <button onClick={() => setEnabled(true)}>
      Start a Recurring Donation
    </button>
  );
}