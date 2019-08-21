import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import DonationsList from './DonationsList';
import CharitiesList from './CharitiesList';
import './Home.css';
import blankAvatar from './blank_avatar.png'
import Profile from './Profile';

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

const NavBar = withRouter(function NavBar({location}){
  return (
    <nav>
      <ul>
        {tabs.map(tab => (
          <li key={tab.path} className={tab.path === location.pathname ? 'active' : undefined}>
            <Link to={tab.path}>
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
})

export default function Home({user}) {
  return (
    <Router>
      <header>
        <div className='header-upper'>
          <h1>Polygive</h1>
          <Link class='profile-link' to={'/profile'}>
            <img src={blankAvatar} />
            {user.name}
          </Link>
        </div>
        <NavBar />
      </header>
      {tabs.map(tab => (
        <Route {...tab} />
      ))}
      <Route path='/profile' component={Profile} />
    </Router>
  );
}
