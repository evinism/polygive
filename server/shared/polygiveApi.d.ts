import ApiResponse from './workarounds/ApiResponse';
import { DonationRecurrence } from '../src/entity/DonationSchedule';
import {ShortCharityRecord} from '../src/projections';
import Charity from '../src/entity/Charity';

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
type ListCharitiesResponse = ShortCharityRecord[];

/* Request/Response pair for GET /donations */
type ListDonationsResponse = {
  donations: {
    id: string,
    charityId: string,
    amount: string,
  }[],
  charities: {
    [id: string]: ShortCharityRecord,
  },
};

type ListDonationSchedulesResponse = {
  donationSchedules: {
    id: string,
    charityId: string,
    recurrence: DonationRecurrence,
    amount: string,
    date: Date,
  }[],
  charities: {
    [id: string]: ShortCharityRecord,
  },
};

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
  '/donation_schedules': {
    GET: {
      query: void,
      params: void,
      body: void,
      response: ApiResponse<ListDonationSchedulesResponse>,
    }
    /*POST: {
      query: void,
      params: void,
      body: CreateDonationRequest,
      response: ApiResponse<CreateDonationResponse>,
    }*/
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
