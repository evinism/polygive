/* Response type for /user/current */
type UserRecord = {
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

type CurrentUserResponse = LoggedOutResponse | LoggedInResponse;

/* Request/Response pair for POST /charities */
type CreateCharityRequest = {
  name: string,
}

type CreateCharityResponse = {
  id: string,
  name: string,
}

/* Request/Response pair for POST /donations */
type CreateDonationRequest = {
  charityId: string,
  amount: string
};

type CreateDonationResponse = {
  id: string,
  userId: string,
  charityId: string,
  amount: string,
  status: string,
};

/* Request/Response pair for GET /charities */
type ListCharitiesResponse = {
  id: string,
  title: string,
}[];

/* Request/Response pair for GET /donations */
type ListDonationsResponse = {
  id: string,
  charityId: string,
  amount: string,
}[];

export default interface PolygiveApi {
  '/charities': {
    GET: {
      response: ListCharitiesResponse,
    },
    POST: {
      body: CreateCharityRequest
      response: CreateCharityResponse,
    },
  }
  '/donations': {
    GET: {
      response: ListDonationsResponse
    }
    POST: {
      body: CreateDonationRequest,
      response: CreateDonationResponse,
    }
  },
  '/all_donations': {
    GET: {
      response: ListDonationsResponse
    },
  },
  '/user/current': {
    GET: {
      response: CurrentUserResponse
    },
  }
}
