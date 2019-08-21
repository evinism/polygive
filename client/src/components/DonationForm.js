import React, {useState} from 'react';
import {createDonation} from '../api';

export default function DonationsForm() {
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const charityId = event.target.charityId.value;
    createDonation(charityId, amount).then(() => setEnabled(true));
  };

  return enabled ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Charity Id: <input name="charityId" type="text" />
        </label>
        <label>
          $<input name="amount" type="number" />
        </label>
        <input type="submit" />
      </form>
    </div> 
  ) : (
    <button onClick={() => setEnabled(true)}>
      Create one!
    </button>
  );
}