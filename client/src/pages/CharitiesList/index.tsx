import React, { useState, useEffect } from "react";
import { getCharities } from "../../api";
import { ListCharitiesResponse } from "../../../../server/shared/polygiveApi";
import DonationForm from "../../components/DonationForm";
import { PaddedList, WaitForLoaded } from "../../components/UIElements";
import { PageProps, LoggedInAppState } from "../../clientTypes";
import DonationScheduleForm from "../../components/DonationScheduleForm";
import "./CharitiesList.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

export default function CharitiesList(_: PageProps<LoggedInAppState>) {
  const [charities, setCharities] = useState<ListCharitiesResponse | undefined>(
    undefined
  );
  useEffect(() => {
    getCharities().then(data => setCharities(data));
  }, []);

  const handleSearch = (search: string) => {
    // very dumb way of handling api requests.
    // This should be switched to a class component to avoid unnecessary
    // rerenders.
    getCharities({ search }).then(data => setCharities(data));
  };

  return (
    <div className="charities-list">
      <h2>Charities</h2>
      <SearchBar onSearch={handleSearch} />
      <WaitForLoaded item={charities}>
        {charities => (
          <PaddedList
            items={charities.map(charity => (
              <div key={charity.id}>
                <h3>
                  <Link to={`/charities/${charity.id}`}>{charity.name}</Link>
                </h3>
                <DonationForm charityId={charity.id} />
                <DonationScheduleForm charityId={charity.id} />
              </div>
            ))}
          />
        )}
      </WaitForLoaded>
    </div>
  );
}
