import React from "react";
import { ShortCharityRecord } from "../../shared/entityRecords";
import DonationScheduleForm from "../../components/DonationScheduleForm";
import DonationForm from "../../components/DonationForm";
import { Link } from "react-router-dom";
import CharityRating from "../../components/CharityRating";

interface CharityListEntryProps {
  charity: ShortCharityRecord;
}

const CharityListEntry = ({ charity }: CharityListEntryProps) => (
  <div key={charity.id}>
    <div className="charity-list-entry-description">
      <h3>
        <Link to={`/charities/${charity.id}`}>{charity.name}</Link>
      </h3>
      <CharityRating rating={charity.score} />
    </div>
    <DonationForm charityId={charity.id} />
    <DonationScheduleForm charityId={charity.id} />
  </div>
);

export default CharityListEntry;
