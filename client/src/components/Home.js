import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DonationsList from './DonationsList';
import CharitiesList from './CharitiesList';

const tabs = [
  {
    path: '/',
    exact: true,
    name: 'Donations',
    component: DonationsList
  },
  {
    path: '/charities',
    name: 'Charities',
    component: CharitiesList
  },
];

function TabSwitcher(){
  return (
    <div>
      {tabs.map((tab) => (
        <Link to={tab.path}>
          {tab.name}
        </Link>
      ))}
    </div>
  )
}

export default function Home({user}) {
  return (
    <header>
      <p>
        Welcome, {user.name}
      </p>
      <Router>
        <TabSwitcher />
        {tabs.map(tab => (
          <Route path={tab.path} component={tab.component} exact={tab.exact} />
        ))}
      </Router>
    </header>
  );
}
