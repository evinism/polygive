import {getRepository} from 'typeorm';
import PolygiveApi from '../../shared/polygiveApi';
import {success, error, mapValues} from '../util';
import {RTAuthedHandler} from '../types/RestypedHelpers';
import ensureConnection from '../connection';
import { shortCharity } from '../projections';
import DonationSchedule from '../entity/DonationSchedule';
import { grabAllCharities } from './controllerHelpers';
import Charity from '../entity/Charity';

type ListDonationSchedules = PolygiveApi['/donation_schedules']['GET'];
export const list: RTAuthedHandler<ListDonationSchedules> = async (req, res) => {
  await ensureConnection();
  return getRepository(DonationSchedule)
    .find({
      where: {
        userId: req.pgUser.id,
      },
      relations: ['charity'],
    })
    .then(donationSchedules => ({
      donationSchedules: donationSchedules.map(schedule => ({
        id: schedule.id.toString(),
        charityId: schedule.charityId.toString(),
        recurrence: schedule.recurrence,
        amount: schedule.amount.toString(),
        anchorDate: schedule.anchorDate,
      })),
      charities: mapValues(grabAllCharities(donationSchedules), shortCharity),
    }))
    .then(success())
    .catch(error(res, 400));
};

type CreateDonationSchedule = PolygiveApi['/donation_schedules']['POST'];
export const create: RTAuthedHandler<CreateDonationSchedule> = async (req, res) => {
  const body = req.body;
  await ensureConnection();
  const donationSchedule = new DonationSchedule();
  donationSchedule.charityId = parseInt(body.charityId, 10);
  donationSchedule.userId = req.pgUser.id;
  donationSchedule.amount = parseFloat(req.body.amount);
  donationSchedule.anchorDate = new Date();

  return getRepository(DonationSchedule)
    .save(donationSchedule)
    .then(async donationSchedule => {
      const charity = await getRepository(Charity).findOne({ where: {
        id: donationSchedule.charityId,
      }});
      return {donationSchedule, charity};
    })
    .then(({donationSchedule, charity}) => ({
      id: donationSchedule.id.toString(),
      charityId: donationSchedule.id.toString(),
      recurrence: donationSchedule.recurrence,
      anchorDate: donationSchedule.anchorDate,
      amount: donationSchedule.amount.toString(),
      charity: shortCharity(charity),
    }))
    .then(success(res, 201))
    .catch(error());
};

type PatchDonationSchedule = PolygiveApi['/donation_schedules/:id']['PATCH'];
export const patch: RTAuthedHandler<PatchDonationSchedule> = async (req, res) => {
  const body = req.body;
  await ensureConnection();
  const donationSchedule = new DonationSchedule();
  donationSchedule.charityId = parseInt(body.charityId, 10);
  donationSchedule.userId = req.pgUser.id;
  donationSchedule.amount = parseFloat(req.body.amount);
  donationSchedule.anchorDate = new Date();

  const dsRepository = getRepository(DonationSchedule);

  return dsRepository.findOneOrFail({
      where: {
        id: req.params.id,
      }
    })
    .then(donationSchedule => {
      donationSchedule.charityId = parseInt(body.charityId);
      donationSchedule.recurrence = body.recurrence;
      donationSchedule.anchorDate = body.anchorDate;
      donationSchedule.amount = parseFloat(body.amount);
      return dsRepository.save(donationSchedule)
    })
    .then(async donationSchedule => {
      const charity = await getRepository(Charity).findOne({ where: {
        id: donationSchedule.charityId,
      }});
      return {donationSchedule, charity};
    })
    .then(({donationSchedule, charity}) => ({
      id: donationSchedule.id.toString(),
      charityId: donationSchedule.charityId.toString(),
      recurrence: donationSchedule.recurrence,
      anchorDate: donationSchedule.anchorDate,
      amount: donationSchedule.amount.toString(),
      charity: shortCharity(charity),
    }))
    .then(success(res, 201))
    .catch(error());
};

export default {list, create, patch};
