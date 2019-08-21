const apiUrl = process.env.REACT_APP_BACKEND_URL;

function makeApiRequestFn(requestBuilder){
  return function(...args){
    const request = requestBuilder(...args);
    let path;
    let config = {};
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

export const getCurrentUser = makeApiRequestFn(() => '/user/current');
export const getDonations = makeApiRequestFn(() => '/donations');
export const getCharities = makeApiRequestFn(() => '/charities');

export const createDonation = makeApiRequestFn((charityId, amount) => [
  '/donations', 
  {
    method: 'post',
    body: { charityId, donationAmount: amount },
  }
]);
