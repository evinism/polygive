import React, { useState, useEffect } from 'react';
import DonationForm from './DonationForm';
import {getDonations} from '../api.js';

export default function DonationsList(){
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    getDonations().then(setDonations);
  }, []);
  return (
    <div>
      Donations:
      {donations.map(donation => (
        <div>Charity {donation.charityId}: ${donation.amount}</div>
      ))}
      <DonationForm />
    </div>
  );
}