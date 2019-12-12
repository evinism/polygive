import { getRepository } from 'typeorm';
import Donation, { DonationStatus } from '../entity/Donation';
import PolygiveApi from '../../shared/polygiveApi';
import { success, error, mapValues } from '../util';
import { RTAuthedHandler, RTSuperHandler } from '../types/RestypedHelpers';
import ensureConnection from '../connection';
import { shortCharity } from '../projections';
import { grabAllCharities } from './controllerHelpers';

// This is a nasty workaround
const castDonationIdsToStrings = (donation: Donation) => ({
  id: donation.id.toString(),
  userId: donation.userId.toString(),
  charityId: donation.charityId.toString(), 
  amount: donation.amount.toString(),
  status: donation.status,
});

type CreateDonation = PolygiveApi['/donations']['POST'];
export const create: RTAuthedHandler<CreateDonation> = async (req, res) => {
  const body = req.body;
  await ensureConnection();
  const donation = new Donation();
  donation.charityId = parseInt(body.charityId, 10);
  donation.userId = req.pgUser.id;
  donation.amount = parseFloat(req.body.amount);
  donation.status = DonationStatus.PENDING;
  return getRepository(Donation)
    .save(donation)
    .then(castDonationIdsToStrings)
    .then(success(res, 201))
    .catch(error());
};

type ListDonations = PolygiveApi['/donations']['GET'];
export const list: RTAuthedHandler<ListDonations> = async (req, res) => {
  await ensureConnection();
  return getRepository(Donation)
    .find({
      where: {
        userId: req.pgUser.id,
      },
      relations: ['charity'],
    })
    .then(donations => ({
      donations: donations.map(castDonationIdsToStrings),
      charities: mapValues(grabAllCharities(donations), shortCharity),
    }))
    .then(success())
    .catch(error(res, 400));
};

type ListAllDonations = PolygiveApi['/all_donations']['GET'];
export const all: RTSuperHandler<ListAllDonations> = async (_, res) => {
  await ensureConnection();
  return getRepository(Donation)
    .find()
    .then(donations => ({
      donations: donations.map(castDonationIdsToStrings),
      charities: mapValues(grabAllCharities(donations), shortCharity),
    }))
    .then(success())
    .catch(error(res, 400));
};

export default {create, list, all};