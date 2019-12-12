import {getRepository} from 'typeorm';
import PolygiveApi from '../../shared/polygiveApi';
import {success, error, mapValues} from '../util';
import {RTAuthedHandler} from '../types/RestypedHelpers';
import ensureConnection from '../connection';
import { shortCharity } from '../projections';
import DonationSchedule from '../entity/DonationSchedule';
import { grabAllCharities } from './controllerHelpers';

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
        date: schedule.anchorDate,
      })),
      charities: mapValues(grabAllCharities(donationSchedules), shortCharity),
    }))
    .then(success())
    .catch(error(res, 400));
};

export default {list};
