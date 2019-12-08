import restypedAxios from 'restyped-axios'
import PolygiveApi from '../../server/shared/polygiveApi';
import ApiResponse from '../../server/shared/workarounds/ApiResponse';

export const baseURL = process.env.REACT_APP_BACKEND_URL;
export const client = restypedAxios.create<PolygiveApi>({baseURL, withCredentials: true});

const getSuccess = <T>(resp: ApiResponse<T>) => {
  if(!resp.success) {
    throw resp.errorData;
  } 
  return resp.successData;
}

export const getCurrentUser = () => client.request({
  url: '/user/current',
}).then(x => getSuccess(x.data));

export const getDonations = () => client.request({
  url: '/donations',
}).then(x => getSuccess(x.data));

export const getCharities = () => client.request({
  url: '/charities',
}).then(x => getSuccess(x.data));

export const createDonation = (charityId: string, amount: string) => 
  client.post<'/donations'>(
    '/donations', 
    { charityId, amount }
  ).then(x => getSuccess(x.data));

export const createCharity = (name: string) => 
  client.post<'/charities'>(
    '/charities',
    { name }
  ).then(x => getSuccess(x.data));