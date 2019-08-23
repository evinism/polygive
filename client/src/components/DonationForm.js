import React, {useState} from 'react';
import {createDonation} from '../api';

export default function DonationsForm({charityId: parentCharityId}) {
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const charityId = parentCharityId || event.target.charityId.value;
    createDonation(charityId, amount).then(() => setEnabled(false));
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
        <input type="submit" />
      </form>
      <button onClick={() => setEnabled(false)}>Close</button>
    </div> 
  ) : (
    <button onClick={() => setEnabled(true)}>
      Create a Donation!
    </button>
  );
}