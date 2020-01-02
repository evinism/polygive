import Charity from './entity/Charity';
import {charityLink} from './links';

export interface ShortCharityRecord {
  id: number,
  name: string,
  link: string,
}

export interface CharityDescriptionRecord {
  id: number,
  name: string,
  link: string,
  description: string,
}

export const shortCharity = (charity: Charity): ShortCharityRecord => ({
  id: charity.id,
  name: charity.name, 
  link: charityLink(charity.id),
});

export const charityRecord = (charity: Charity): CharityDescriptionRecord => ({
  id: charity.id,
  name: charity.name,
  link: charityLink(charity.id),
  description: 'Blah blah blah blah',
});

