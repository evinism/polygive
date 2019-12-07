import restypedAxios from 'restyped-axios'
import PolygiveApi from '../../server/shared/polygiveApi';

export const baseURL = process.env.REACT_APP_BACKEND_URL;
export const client = restypedAxios.create<PolygiveApi>({baseURL});

export const getCurrentUser = () => client.request({
  url: '/user/current',
}).then(x => x.data);

export const getDonations = () => client.request({
  url: '/donations',
}).then(x => x.data);

export const getCharities = () => client.request({
  url: '/charities',
}).then(x => x.data);

export const createDonation = (charityId: string, amount: string) => 
  client.post<'/donations'>(
    '/donations', 
    { charityId, amount }
  ).then(x => x.data);

export const createCharity = (name: string) => 
  client.post<'/charities'>(
    '/charities',
    { name }
  ).then(x => x.data);