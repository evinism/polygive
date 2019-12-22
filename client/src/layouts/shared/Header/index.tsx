import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { tabList, pageManifest } from '../../../appData';
import blankAvatar from '../../../assets/blank_avatar.png';
import { LoggedInAppState } from '../../../clientTypes';
import Dropdown, {DropdownLink, DropdownExternalLink} from '../../../components/Dropdown';
import './Header.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

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

export const PublicHeader = () => (
  <header>
    <h1><Link to={'/'}>Polygive</Link></h1>
    <NavBar />
    <div className="header-profile">
      <Link to="/login">Log In to PolyGive</Link>
    </div>
  </header>
);

export const LoggedInHeader = ({state: {user}}: {state: LoggedInAppState}) => (
  <header>
    <h1><Link to={'/'}>Polygive</Link></h1>
    <NavBar />
    <Dropdown contents={(
      <>
        <DropdownLink to='/profile'>Profile</DropdownLink>
        <DropdownLink to='/payment'>Payment</DropdownLink>
        {user.isSuper && <DropdownLink to='/superpanel'>Super Panel</DropdownLink>}
        <DropdownExternalLink href={`${apiUrl}/logout`}>Log Out</DropdownExternalLink>
      </>
    )}>
      <div className="header-profile">
        <img src={blankAvatar} alt="Avatar" />
        {user.name}
      </div>
    </Dropdown>
  </header>
);

export default LoggedInHeader;
