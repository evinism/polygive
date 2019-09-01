import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import tabs from '../app/tabs';
import blankAvatar from '../assets/blank_avatar.png';
import { LoggedInAppState } from '../clientTypes';
import './Header.css';

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

const Header = ({state: {user}}: {state: LoggedInAppState}) => (
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
);

export default Header;
