import Charity from "./entity/Charity";
import { charityLink } from "./links";
import { Currency } from "../shared/money";
import PaymentConfiguration from "./entity/PaymentConfiguration";

// TODO: We should really move these to their appropriate entity files
export interface ShortCharityRecord {
  id: number;
  name: string;
  link: string;
}

export const shortCharity = (charity: Charity): ShortCharityRecord => ({
  id: charity.id,
  name: charity.name,
  link: charityLink(charity.id)
});

export interface CharityDescriptionRecord {
  id: number;
  name: string;
  link: string;
  description: string;
}

export const charityRecord = (charity: Charity): CharityDescriptionRecord => ({
  id: charity.id,
  name: charity.name,
  link: charityLink(charity.id),
  description: "Blah blah blah blah"
});

export interface PaymentConfigurationRecord {
  defaultCurrency: Currency;
}

export const paymentConfigurationRecord = (pc: PaymentConfigurationRecord) => ({
  defaultCurrency: pc.defaultCurrency
});
