import { Currency } from "./money";

export enum DonationRecurrence {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY"
}

/* Response type for /user/current */
export interface UserRecord {
  id: number;
  email: string;
  name: string;
  isSuper: boolean;
}

export interface DonationRecord {
  id: number;
  charityId: number;
  amount: number;
  currency: Currency;
}

export interface DonationScheduleRecord {
  id: number;
  charityId: number;
  recurrence: DonationRecurrence;
  amount: number;
  currency: Currency;
  nextScheduledDonation: string;
}

export interface PaymentConfigurationRecord {
  defaultCurrency: Currency;
}

export interface ShortCharityRecord {
  id: number;
  name: string;
  tagline: string;
  score: number;
  link: string;
}

export interface CharityDescriptionRecord extends ShortCharityRecord {
  description: string;
}
