import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import {getDonations} from '../api.js';

export default function DonationsList(){
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    getDonations().then(setDonations);
  }, []);
  return (
    <article>
      <h2>Donations</h2>
      {donations.map(donation => (
        <div key={donation.id}>Charity {donation.charityId}: ${donation.amount}</div>
      ))}
      <DonationForm />
    </article>
  );
}