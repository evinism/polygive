import ApiResponse from "./workarounds/ApiResponse";
import {
  ShortCharityRecord as TempShortCharityRecord,
  PaymentConfigurationRecord as TempPaymentConfigurationRecord
} from "../src/projections";
import Charity from "../src/entity/Charity";
import DonationSchedule, {
  DonationRecurrence as TempDonationRecurrence
} from "../src/entity/DonationSchedule";
import { Currency } from "./currency";
import PaymentConfiguration from "../src/entity/PaymentConfiguration";

// Garbage workaround-- I really should fix this
type ShortCharityRecord = TempShortCharityRecord;
type PaymentConfigurationRecord = TempPaymentConfigurationRecord;
type DonationRecurrence = TempDonationRecurrence;

type Paginated<T> = {
  page: number;
  totalPages: number;
  data: T;
};

/* Response type for /user/current */
type UserRecord = {
  id: number;
  email: string;
  name: string;
  isSuper: boolean;
};

type DonationRecord = {
  id: number;
  charityId: number;
  amount: number;
  currency: Currency;
};

type DonationScheduleRecord = {
  id: number;
  charityId: number;
  recurrence: DonationRecurrence;
  amount: number;
  currency: Currency;
  nextScheduledDonation: string;
};

type LoggedOutResponse = {
  loggedIn: false;
};

type LoggedInResponse = {
  loggedIn: true;
  user: UserRecord;
  paymentConfiguration?: PaymentConfigurationRecord;
};

type CurrentUserResponse = LoggedOutResponse | LoggedInResponse;

/* Request/Response pair for POST /charities */
type CreateCharityRequest = {
  name: string;
};

type CreateCharityResponse = {
  id: number;
  name: string;
};

/* Request/Response pair for POST /donations */
type CreateDonationRequest = {
  charityId: number;
  amount: number;
};

type CreateDonationResponse = {
  id: number;
  userId: number;
  charityId: number;
  amount: number;
  status: string;
};

/* Request/Response pair for GET /charities */
type ListCharitiesResponse = ShortCharityRecord[];

/* Request/Response pair for GET /donations */
type ListDonationsResponse = {
  donations: DonationRecord[];
  charities: {
    [id: number]: ShortCharityRecord;
  };
};

type ListDonationSchedulesResponse = {
  donationSchedules: DonationScheduleRecord[];
  charities: {
    [id: number]: ShortCharityRecord;
  };
};

type CreateDonationScheduleRequest = {
  charityId: number;
  amount: number;
  recurrence: DonationRecurrence;
};

type CreateDonationScheduleResponse = {
  id: number;
  charityId: number;
  recurrence: DonationRecurrence;
  amount: number;
  nextScheduledDonation: string;
  charity: ShortCharityRecord;
};

export default interface PolygiveApi {
  "/charities": {
    GET: {
      query:
        | {
            search?: string;
            page?: number;
          }
        | undefined;
      body: void;
      params: void;
      response: ApiResponse<Paginated<ListCharitiesResponse>>;
    };
    POST: {
      query: void;
      params: void;
      body: CreateCharityRequest;
      response: ApiResponse<CreateCharityResponse>;
    };
  };
  "/charities/:id": {
    GET: {
      query: void;
      body: void;
      params: {
        id: number;
      };
      response: ApiResponse<ShortCharityRecord>;
    };
  };
  "/donations": {
    GET: {
      query: void;
      params: void;
      body: void;
      response: ApiResponse<ListDonationsResponse>;
    };
    POST: {
      query: void;
      params: void;
      body: CreateDonationRequest;
      response: ApiResponse<CreateDonationResponse>;
    };
  };
  "/donation_schedules": {
    GET: {
      query: void;
      params: void;
      body: void;
      response: ApiResponse<ListDonationSchedulesResponse>;
    };
    POST: {
      query: void;
      params: void;
      body: CreateDonationScheduleRequest;
      response: ApiResponse<CreateDonationScheduleResponse>;
    };
  };
  "/donation_schedules/:id": {
    PATCH: {
      query: void;
      body: DonationScheduleRecord;
      params: {
        id: number;
      };
      response: ApiResponse<DonationScheduleRecord>;
    };
  };
  "/all_donations": {
    GET: {
      query: void;
      params: void;
      body: void;
      response: ApiResponse<ListDonationsResponse>;
    };
  };
  "/user/current": {
    GET: {
      query: void;
      params: void;
      body: void;
      response: ApiResponse<CurrentUserResponse>;
    };
  };
  "/unflushed_donations": {
    GET: {
      query: void;
      params: void;
      body: void;
      response: ApiResponse<ListDonationsResponse>;
    };
  };
}
