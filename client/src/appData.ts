
import Home from './layouts/Home';
import { PageManifest } from './clientTypes';
import SuperPanel from './pages/SuperPanel';
import IndexPage from './pages/IndexPage';
import CharitiesList from './pages/CharitiesList';
import DonationsList from './pages/DonationsList';
import Profile from './pages/Profile';

export const pageManifest: PageManifest = {
  index: {
    public: true,
    path: '/',
    exact: true,
    name: 'Portfolio',
    component: IndexPage,
  },
  donations: {
    path: '/donations',
    exact: false,
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
