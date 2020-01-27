import ApiResponse from "./workarounds/ApiResponse";
import {
  ShortCharityRecord,
  PaymentConfigurationRecord,
  UserRecord,
  DonationRecord,
  DonationRecurrence,
  DonationScheduleRecord
} from "./entityRecords";

export interface Paginated<T> {
  page: number;
  totalPages: number;
  data: T;
}

export interface LoggedOutResponse {
  loggedIn: false;
}

export interface LoggedInResponse {
  loggedIn: true;
  user: UserRecord;
  paymentConfiguration?: PaymentConfigurationRecord;
}

export type CurrentUserResponse = LoggedOutResponse | LoggedInResponse;

/* Request/Response pair for POST /charities */
interface CreateCharityRequest {
  name: string;
}

interface CreateCharityResponse {
  id: number;
  name: string;
}

/* Request/Response pair for POST /donations */
interface CreateDonationRequest {
  charityId: number;
  amount: number;
}

interface CreateDonationResponse {
  id: number;
  userId: number;
  charityId: number;
  amount: number;
  status: string;
}

/* Request/Response pair for GET /charities */
export type ListCharitiesResponse = ShortCharityRecord[];

/* Request/Response pair for GET /donations */
export interface ListDonationsResponse {
  donations: DonationRecord[];
  charities: {
    [id: number]: ShortCharityRecord;
  };
}

export interface ListDonationSchedulesResponse {
  donationSchedules: DonationScheduleRecord[];
  charities: {
    [id: number]: ShortCharityRecord;
  };
}

export interface CreateDonationScheduleRequest {
  charityId: number;
  amount: number;
  recurrence: DonationRecurrence;
}

export interface CreateDonationScheduleResponse {
  id: number;
  charityId: number;
  recurrence: DonationRecurrence;
  amount: number;
  nextScheduledDonation: string;
  charity: ShortCharityRecord;
}

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
  "/user/current/payment_configuration": {
    POST: {
      query: void;
      params: void;
      body: PaymentConfigurationRecord;
      response: ApiResponse<PaymentConfigurationRecord>;
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
