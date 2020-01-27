import Charity from "./entity/Charity";
import { charityLink } from "./links";
import {
  ShortCharityRecord,
  CharityDescriptionRecord,
  PaymentConfigurationRecord
} from "../shared/entityRecords";

export const shortCharity = (charity: Charity): ShortCharityRecord => ({
  id: charity.id,
  name: charity.name,
  tagline: charity.tagline,
  score: charity.score,
  link: charityLink(charity.id)
});

export const charityRecord = (charity: Charity): CharityDescriptionRecord => ({
  ...shortCharity(charity),
  description: charity.description
});

export const paymentConfigurationRecord = (pc: PaymentConfigurationRecord) => ({
  defaultCurrency: pc.defaultCurrency
});
