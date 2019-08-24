import {UserResponse, CharityResponse, DonationsResponse} from './apiTypes';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function makeApiRequestFn<T, N>(requestBuilder: (arg0: T | T) => string | [string, RequestInit]) : (arg0: T) => Promise<N>{  
  return async function(arg: T){
    const request = requestBuilder(arg);
    let path : string = '';
    let config: RequestInit = {};
    if (Array.isArray(request)) {
      [path, config] = request;
    } else {
      path = request;
    }

    config = {
      credentials: 'include',
      ...config,
    };
    const url = apiUrl + path;
    return fetch(url, config).then(response => response.json());
  }
};

const jsonPostCfg = (data: {[key: string]: string}) : RequestInit => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const queryStringify = (params: {[key: string]: string}) => Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

// TODO: Make this not so dumb.
const parameterizedByQs = (path: string) => (qs: ({[key: string]: string}|void)) => {
  if (qs) {
    return path + '?' + queryStringify(qs);
  }
  return path;
}

export const getCurrentUser: (_: void) => Promise<UserResponse> = 
  makeApiRequestFn((_: void) => '/user/current');
export const getDonations: (_: void) => Promise<DonationsResponse> = 
  makeApiRequestFn((_: void) => '/donations');
export const getCharities: (_: void) => Promise<CharityResponse> = 
  makeApiRequestFn(parameterizedByQs('/charities'));

export const createDonation = makeApiRequestFn(
  ({charityId, amount}: {charityId: string, amount: string}) => [
    '/donations',
    jsonPostCfg({
      charityId,
      donationAmount: amount,
    })
  ]);


export const createCharity = makeApiRequestFn((charityName: string) => [
  '/charities',
  jsonPostCfg({ charityName }),
])
