import { Response } from "express";
import { ApiSuccess, ApiError } from "../shared/workarounds/ApiResponse";
import { DonationRecurrence } from "../shared/entityRecords";
export { RTHandler } from "./types/RestypedHelpers";

export const success = (res?: Response, status = 200) => <T>(
  successData: T
): ApiSuccess<T> => {
  if (res) {
    res.status(status);
  }
  return {
    success: true,
    successData
  };
};

export const error = (res?: Response, status = 500) => (
  errorData: any
): ApiError => {
  if (res) {
    res.status(status);
  }
  return {
    success: false,
    errorData
  };
};

export function mapValues<T, R>(
  obj: { [key: string]: T },
  fn: (arg: T) => R
): { [key: string]: R } {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    acc[key] = fn(val);
    return acc;
  }, {});
}

export const getNextDonationDate = (
  prev: Date,
  recurrence: DonationRecurrence
) => {
  const date = new Date(prev.getTime());
  const lookup: { [key in DonationRecurrence]: () => void } = {
    WEEKLY: () => {
      date.setDate(date.getDate() + 7);
    },
    MONTHLY: () => {
      date.setMonth(date.getMonth() + 1);
    },
    YEARLY: () => {
      date.setFullYear(date.getFullYear() + 1);
    }
  };
  lookup[recurrence]();
  return date;
};
