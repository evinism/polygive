import React, { useState, FormEvent } from "react";
import { createDonation } from "../api";

export default function DonationsForm({
  charityId: parentCharityId
}: {
  charityId?: number;
}) {
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = (event.target as any).amount.value as string;
    const charityId =
      parentCharityId ||
      parseInt((event.target as any).charityId.value as string, 10);
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
    <button onClick={() => setEnabled(true)}>Create a Donation!</button>
  );
}
