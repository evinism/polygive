const apiUrl = process.env.REACT_APP_BACKEND_URL;

function makeApiRequestFn(urlBuilder, config){
  config = {
    credentials: 'include',
    ...config,
  };
  return function(...args){
    const url = apiUrl + urlBuilder(...args);
    return fetch(url, config).then(response => response.json());
  }
};

export const getCurrentUser = makeApiRequestFn(() => '/user/current');
export const getDonations = makeApiRequestFn(() => '/donations');
export const getCharities = makeApiRequestFn(() => '/charities');
