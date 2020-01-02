import ApiResponse from './workarounds/ApiResponse';
import { ShortCharityRecord as Temp1, } from '../src/projections';
import Charity from '../src/entity/Charity';
import DonationSchedule, { DonationRecurrence as Temp2 } from '../src/entity/DonationSchedule';
import {Currency} from './currency';


type ShortCharityRecord = Temp1;
type DonationRecurrence = Temp2;

/* Response type for /user/current */
type UserRecord = {
  id: number,
  email: string,
  name: string,
  isSuper: boolean,
}

type DonationRecord = {
  id: number,
  charityId: number,
  amount: string,
  currency: Currency,
}

type DonationScheduleRecord = {
  id: number,
  charityId: number,
  recurrence: DonationRecurrence,
  amount: string,
  currency: Currency,
  anchorDate: Date,
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
  id: number,
  name: string,
}

/* Request/Response pair for POST /donations */
type CreateDonationRequest = {
  charityId: number,
  amount: string
};

type CreateDonationResponse = {
  id: number,
  userId: number,
  charityId: number,
  amount: string,
  status: string,
};

/* Request/Response pair for GET /charities */
type ListCharitiesResponse = ShortCharityRecord[];

/* Request/Response pair for GET /donations */
type ListDonationsResponse = {
  donations: DonationRecord[],
  charities: {
    [id: number]: ShortCharityRecord,
  },
};

type ListDonationSchedulesResponse = {
  donationSchedules: DonationScheduleRecord[],
  charities: {
    [id: number]: ShortCharityRecord,
  },
};

type CreateDonationScheduleRequest = {
  charityId: number,
  amount: string
  recurrence: DonationRecurrence,
};

type CreateDonationScheduleResponse = {
  id: number,
  charityId: number,
  recurrence: DonationRecurrence,
  amount: string,
  anchorDate: Date,
  charity: ShortCharityRecord,
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
  },
  '/charities/:id': {
    GET: {
      query: void,
      body: void,
      params: {
        id: number,
      },
      response: ApiResponse<ShortCharityRecord>,
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
    POST: {
      query: void,
      params: void,
      body: CreateDonationScheduleRequest,
      response: ApiResponse<CreateDonationScheduleResponse>,
    }
  },
  '/donation_schedules/:id': {
    PATCH: {
      query: void,
      body: DonationScheduleRecord,
      params: {
        id: number,
      },
      response: ApiResponse<DonationScheduleRecord>,
    },
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
  },
  '/unflushed_donations': {
    GET: {
      query: void,
      params: void,
      body: void,
      response: ApiResponse<ListDonationsResponse>,
    },
  },
}
