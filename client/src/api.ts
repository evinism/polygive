import restypedAxios from "restyped-axios";
import PolygiveApi, {
  DonationRecurrence,
  DonationScheduleRecord
} from "../../server/shared/polygiveApi";
import ApiResponse from "../../server/shared/workarounds/ApiResponse";

export const baseURL = process.env.REACT_APP_BACKEND_URL;
export const client = restypedAxios.create<PolygiveApi>({
  baseURL,
  withCredentials: true
});

const getSuccess = <T>(resp: ApiResponse<T>) => {
  if (!resp.success) {
    throw resp.errorData;
  }
  return resp.successData;
};

export const getCurrentUser = () =>
  client
    .request({
      url: "/user/current"
    })
    .then(x => getSuccess(x.data));

export const getDonations = () =>
  client
    .request({
      url: "/donations"
    })
    .then(x => getSuccess(x.data));

export const getDonationSchedules = () =>
  client
    .request({
      url: "/donation_schedules"
    })
    .then(x => getSuccess(x.data));

export const getCharities = (
  query?: PolygiveApi["/charities"]["GET"]["query"]
) =>
  client
    .request({
      url: "/charities",
      params: query
    })
    .then(x => getSuccess(x.data));

export const getCharity = (charityId: number) =>
  client
    .get<"/charities/:id">(`/charities/${charityId}`)
    .then(x => getSuccess(x.data));

export const createDonation = (charityId: number, amount: number) =>
  client
    .post<"/donations">("/donations", { charityId, amount })
    .then(x => getSuccess(x.data));

export const createDonationSchedule = (
  charityId: number,
  amount: number,
  recurrence: DonationRecurrence
) =>
  client
    .post<"/donation_schedules">("/donation_schedules", {
      charityId,
      amount,
      recurrence
    })
    .then(x => getSuccess(x.data));

export const patchDonationSchedule = (record: DonationScheduleRecord) =>
  client
    .patch<"/donation_schedules/:id">(
      `/donation_schedules/${record.id}`,
      record
    )
    .then(x => getSuccess(x.data));

// Super routes
export const getUnflushedDonations = () =>
  client
    .request({
      url: "/unflushed_donations"
    })
    .then(x => getSuccess(x.data));

export const createCharity = (name: string) =>
  client
    .post<"/charities">("/charities", { name })
    .then(x => getSuccess(x.data));
