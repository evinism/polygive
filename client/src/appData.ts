import DonationsList from './pages/DonationsList';
import CharitiesList from './pages/CharitiesList';
import Profile from './pages/Profile';
import Home from './layouts/Home';
import { PageManifest } from './clientTypes';
import SuperPanel from './pages/SuperPanel';

export const pageManifest: PageManifest = {
  donations: {
    path: '/',
    exact: true,
    name: 'Donations',
    component: DonationsList,
    layout: Home,
  },
  charities: {
    path: '/charities',
    exact: false,
    name: 'Charities',
    component: CharitiesList,
    layout: Home,
  },
  profile: {
    path: '/profile',
    exact: true,
    component: Profile,
    name: 'Profile',
    layout: Home,
  },
  superPanel: {
    path: '/superpanel',
    component: SuperPanel,
    name: 'Super Panel',
    layout: Home,
    super: true,
  },
};

export const tabList = [
  'donations',
  'charities',
];
