import { getRepository } from 'typeorm';
import Donation, { DonationStatus } from '../entity/Donation';
import PolygiveApi from '../../shared/polygiveApi';
import { success, error, mapValues } from '../util';
import { RTAuthedHandler, RTSuperHandler } from '../types/RestypedHelpers';
import ensureConnection from '../connection';
import { shortCharity } from '../projections';
import { grabAllCharities } from './controllerHelpers';

// This is a nasty workaround
const castAmountToString = (donation: Donation) => ({
  id: donation.id,
  userId: donation.userId,
  charityId: donation.charityId, 
  amount: donation.amount.toString(),
  currency: donation.currency,
  status: donation.status,
});

type CreateDonation = PolygiveApi['/donations']['POST'];
export const create: RTAuthedHandler<CreateDonation> = async (req, res) => {
  const body = req.body;
  await ensureConnection();
  const donation = new Donation();
  donation.charityId = body.charityId;
  donation.userId = req.pgUser.id;
  donation.amount = parseFloat(req.body.amount);
  donation.status = DonationStatus.DRAFT;
  return getRepository(Donation)
    .save(donation)
    .then(castAmountToString)
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
      donations: donations.map(castAmountToString),
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
      donations: donations.map(castAmountToString),
      charities: mapValues(grabAllCharities(donations), shortCharity),
    }))
    .then(success())
    .catch(error(res, 400));
};

type ListUnflushedDonations = PolygiveApi['/unflushed_donations']['GET'];
export const unflushed: RTSuperHandler<ListUnflushedDonations> = async (_, res) => {
  await ensureConnection();
  return getRepository(Donation)
    .find({
      where: {
        status: DonationStatus.PAID,
      },
    })
    .then(donations => ({
      donations: donations.map(castAmountToString),
      charities: mapValues(grabAllCharities(donations), shortCharity),
    }))
    .then(success())
    .catch(error(res, 400));
};

export default {create, list, all, unflushed};