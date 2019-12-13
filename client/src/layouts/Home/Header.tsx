import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {tabList, pageManifest} from '../../appData';
import blankAvatar from '../../assets/blank_avatar.png';
import { LoggedInAppState } from '../../clientTypes';
import Dropdown, {DropdownLink} from '../../components/Dropdown';
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
      <h1><Link to={'/'}>Polygive</Link></h1>
      <NavBar />
      <Dropdown contents={(
        <>
          <DropdownLink to='/profile'>Profile</DropdownLink>
          <DropdownLink to='/payment'>Payment</DropdownLink>
          {user.isSuper && <DropdownLink to='/superpanel'>Super Panel</DropdownLink>}
        </>
      )}>
        <div className="header-profile">
          <img src={blankAvatar} alt="Avatar" />
          {user.name}
        </div>
      </Dropdown>
    </div>
  </header>
);

export default Header;
