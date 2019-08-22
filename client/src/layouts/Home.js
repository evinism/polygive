import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import DonationsList from '../pages/DonationsList';
import CharitiesList from '../pages/CharitiesList';
import SuperPanel from '../pages/SuperPanel';
import './Home.css';
import blankAvatar from './blank_avatar.png'
import Profile from '../pages/Profile';

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
});

const withProps = 
  props =>
  Component => 
  () => 
  <Component {...props} />;

export default function Home({ state }) {
  const { user } = state;
  const withState = withProps({ state });
  return (
    <Router>
      <header>
        <div className='header-upper'>
          <h1>Polygive</h1>
          {user.isSuper && <Link to='/superpanel'>Super Panel</Link>}
          <Link class='profile-link' to={'/profile'}>
            <img src={blankAvatar} />
            {user.name}
          </Link>
        </div>
        <NavBar />
      </header>
      {tabs.map(tab => (
        <Route {...tab} component={withState(tab.component)} />
      ))}
      <Route path='/profile' component={withState(Profile)} />
      {user.isSuper && <Route path='/superpanel' component={withState(SuperPanel)} />}
    </Router>
  );
}
