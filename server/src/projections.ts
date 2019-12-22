import Charity from './entity/Charity';
import {charityLink} from './links';

export interface ShortCharityRecord {
  id: string,
  name: string,
  link: string,
}

export interface CharityDescriptionRecord {
  id: string,
  name: string,
  link: string,
  description: string,
}

export const shortCharity = (charity: Charity): ShortCharityRecord => ({
  id: charity.id.toString(),
  name: charity.name, 
  link: charityLink(charity.id),
});

export const charityRecord = (charity: Charity): CharityDescriptionRecord => ({
  id: charity.id.toString(),
  name: charity.name, 
  link: charityLink(charity.id),
  description: 'Blah blah blah blah',
});

