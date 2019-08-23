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

const jsonPostCfg = (data) => ({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

const queryStringify = params => Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

const parameterizedByQs = path => qs =>
  qs ? path + '?' + queryStringify(qs) : path;

export const getCurrentUser = makeApiRequestFn(() => '/user/current');
export const getDonations = makeApiRequestFn(() => '/donations');
export const getCharities = makeApiRequestFn(parameterizedByQs('/charities'));

export const createDonation = makeApiRequestFn((charityId, amount) => [
  '/donations',
  jsonPostCfg({charityId, donationAmount: amount })
]);
export const createCharity = makeApiRequestFn((charityName) => [
  '/charities',
  jsonPostCfg({ charityName }),
])
