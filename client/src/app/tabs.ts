import DonationsList from '../pages/DonationsList';
import CharitiesList from '../pages/CharitiesList';

export default [
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