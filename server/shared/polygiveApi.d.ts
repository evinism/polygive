import ApiResponse from './workarounds/ApiResponse';
import DonationSchedule from '../src/entity/DonationSchedule';
import {ShortCharityRecord} from '../src/projections';

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

type ListDonationSchedules = {
  id: string,
  userId: string,
  charity: ShortCharityRecord,
  schedule: DonationSchedule,
  date: Date,
}

export default interface PolygiveApi {
  '/charities': {
    GET: {
      query: void,
      body: void,
      params: void,
      response: ApiResponse<ListCharitiesResponse>,
    },
    POST: {
      query: void,
      params: void,
      body: CreateCharityRequest,
      response: ApiResponse<CreateCharityResponse>,
    },
  }
  '/donations': {
    GET: {
      query: void,
      params: void,
      body: void,
      response: ApiResponse<ListDonationsResponse>,
    }
    POST: {
      query: void,
      params: void,
      body: CreateDonationRequest,
      response: ApiResponse<CreateDonationResponse>,
    }
  },
  '/donationschedules': {
    GET: {
      query: void,
      params: void,
      body: void,
      response: ApiResponse<ListDonationsResponse>,
    }
    POST: {
      query: void,
      params: void,
      body: CreateDonationRequest,
      response: ApiResponse<CreateDonationResponse>,
    }
  },
  '/all_donations': {
    GET: {
      query: void,
      params: void,
      body: void,
      response: ApiResponse<ListDonationsResponse>,
    },
  },
  '/user/current': {
    GET: {
      query: void,
      params: void,
      body: void,
      response: ApiResponse<CurrentUserResponse>,
    },
  }
}
