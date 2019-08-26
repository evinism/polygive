import React, {JSXElementConstructor} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import DonationsList from '../pages/DonationsList';
import CharitiesList from '../pages/CharitiesList';
import SuperPanel from '../pages/SuperPanel';
import blankAvatar from './../assets/blank_avatar.png'
import Profile from '../pages/Profile';
import {LoggedInAppState} from '../clientTypes';
import './Home.css';


const tabs = [
  {
    path: '/',
    exact: true,
    name: 'Donations',
    component: DonationsList
  },
  {
    path: '/charities',
    exact: false,
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

function withProps<T>(props: T) {
  return (Component: JSXElementConstructor<T>) => 
    () => 
    <Component {...props} />;
}


export default function Home({ state }: {state: LoggedInAppState}) {
  const user = state.user;
  const withState = withProps({ state });
  return (
    <Router>
      <header>
        <div className='header-upper'>
          <h1>Polygive</h1>
          {user.isSuper && <Link to='/superpanel'>Super Panel</Link>}
          <Link className='profile-link' to={'/profile'}>
            <img src={blankAvatar} alt="Avatar" />
            {user.name}
          </Link>
        </div>
        <NavBar />
      </header>
      {tabs.map(tab => (
        <Route 
          path={tab.path} 
          exact={tab.exact}
          component={withState(tab.component)} />
      ))}
      <Route path='/profile' component={withState(Profile)} />
      {user.isSuper && <Route path='/superpanel' component={withState(SuperPanel)} />}
    </Router>
  );
}
