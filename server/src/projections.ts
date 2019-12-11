import Charity from './entity/Charity';
import {charityLink} from './links';

export interface ShortCharityRecord {
  id: string,
  name: string,
  link: string,
}

export const shortCharity = (charity: Charity): ShortCharityRecord => ({
  id: charity.id.toString(),
  name: charity.name, 
  link: charityLink(charity.id),
});
