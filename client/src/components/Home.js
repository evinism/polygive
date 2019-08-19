import React, { useState } from 'react';
import DonationsList from './DonationsList';
import CharitiesList from './CharitiesList';


export const tabs = {
  dontations: 'DONATIONS',
  charities: 'CHARITIES',
};

const tabMapping = {
  [tabs.donations]: {
    name: 'Donations',
    component: DonationsList
  },
  [tabs.charities]: {
    name: 'Charities',
    component: CharitiesList
  },
}

function TabSwitcher({setTab, tabId}){
  return (
    <div>
      {Object.entries(tabMapping).map(([id, data]) => (
        <button onClick={() => setTab(id)}>
          {(id === tabId) && '*'}
          {data.name}
        </button>
      ))}
    </div>
  )
}

export default function Home({user}) {
  const [tabId, setTab] = useState(tabs.donations);

  const TabComponent = tabMapping[tabId].component;
  return (
    <header>
      <p>
        Welcome, {user.name}
      </p>
      <TabSwitcher setTab={setTab} tabId={tabId}/>
      <TabComponent />
    </header>
  );
}
