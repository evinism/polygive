import {getRepository} from 'typeorm';
import Donation, {DonationStatus} from '../entity/Donation';
import User from '../entity/User';
import PolygiveApi from '../../shared/polygiveApi';
import {RTHandler, success, error} from './util';
import ensureConnection from '../connection';


// This is a nasty workaround
const castDonationIdsToStrings = (donation: Donation) => ({
  id: donation.id.toString(),
  userId: donation.userId.toString(),
  charityId: donation.charityId.toString(), 
  amount: donation.amount.toString(),
  status: donation.status,
});

type CreateDonation = PolygiveApi['/donations']['POST'];
export const create: RTHandler<CreateDonation> = async (req, res) => {
  const body = req.body;
  await ensureConnection();
  const donation = new Donation();
  donation.charityId = parseInt(body.charityId, 10);
  // We don't know that the User corresponds to a User obj natively.
  // But we can be kinda sure.t
  donation.userId = (req.user as User).id;
  donation.amount = parseFloat(req.body.amount);
  donation.status = DonationStatus.PENDING;
  return getRepository(Donation)
    .save(donation)
    .then(castDonationIdsToStrings)
    .then(success(res, 201))
    .catch(error());
};

type ListDonations = PolygiveApi['/donations']['GET'];
export const list: RTHandler<ListDonations> = async (req, res) => {
  await ensureConnection();
  return getRepository(Donation)
    .find(({
      where: {
        userId: (req.user as any).id,
      }
    }))
    .then(list => list.map(castDonationIdsToStrings))
    .then(success())
    .catch(error(res, 400));
};

type ListAllDonations = PolygiveApi['/all_donations']['GET'];
export const all: RTHandler<ListAllDonations> = async (_, res) => {
  await ensureConnection();
  return getRepository(Donation)
    .find()
    .then(list => list.map(castDonationIdsToStrings))
    .then(success())
    .catch(error(res, 400));
};

export default {create, list, all};