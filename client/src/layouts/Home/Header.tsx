import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {tabList, pageManifest} from '../../appData';
import blankAvatar from '../../assets/blank_avatar.png';
import { LoggedInAppState } from '../../clientTypes';
import './Header.css';

const NavBar = withRouter(function NavBar({location}){
  return (
    <nav>
      <ul>
        {tabList.map(tabId => {
          const page = pageManifest[tabId];
          return (
            <li key={page.path} className={page.path === location.pathname ? 'active' : undefined}>
              <Link to={page.path}>
                {page.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
});

const Header = ({state: {user}}: {state: LoggedInAppState}) => (
  <header>
    <div className='header-upper'>
      <h1>Polygive</h1>
      <NavBar />
      {user.isSuper && <Link to='/superpanel'>Super Panel</Link>}
      <Link className='profile-link' to={'/profile'}>
        <img src={blankAvatar} alt="Avatar" />
        {user.name}
      </Link>
    </div>
  </header>
);

export default Header;
