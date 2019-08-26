// Right now I don't have a good way of keeping these in sync
// so please make sure these two files stay in sync:
// client/src/shared/apiTypes.ts
// server/src/shared/apiTypes.ts

/* Response type for /user/current */
export type UserRecord = {
  id: string,
  email: string,
  name: string,
  isSuper: boolean,
}

type LoggedOutResponse = {
  loggedIn: false,
}

type LoggedInResponse = {
  loggedIn: true,
  user: UserRecord,
}

export type CurrentUserResponse = LoggedOutResponse | LoggedInResponse;

/* Request/Response pair for POST /charities */
export type CreateCharityRequest = {
  name: string,
}

export type CreateCharityResponse = {
  id: string,
  name: string,
}

/* Request/Response pair for POST /donations */
export type CreateDonationRequest = {
  charityId: string,
  amount: string
};

export type CreateDonationResponse = {
  id: string,
  userId: string,
  charityId: string,
  amount: string,
  status: string,
};

/* Request/Response pair for GET /charities */
export type ListCharitiesResponse = {
  id: string,
  title: string,
}[];

/* Request/Response pair for GET /donations */
export type ListDonationsResponse = {
  id: string,
  charityId: string,
  amount: string,
}[];
