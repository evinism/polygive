import { getRepository } from "typeorm";
import PolygiveApi from "../../shared/polygiveApi";
import { success, error, mapValues, getNextDonationDate } from "../util";
import { RTAuthedHandler } from "../types/RestypedHelpers";
import ensureConnection from "../connection";
import { shortCharity } from "../projections";
import DonationSchedule, {
  DonationRecurrence
} from "../entity/DonationSchedule";
import { grabAllCharities } from "./controllerHelpers";
import Charity from "../entity/Charity";

type ListDonationSchedules = PolygiveApi["/donation_schedules"]["GET"];
export const list: RTAuthedHandler<ListDonationSchedules> = async (
  req,
  res
) => {
  await ensureConnection();
  return getRepository(DonationSchedule)
    .find({
      where: {
        userId: req.pgUser.id
      },
      relations: ["charity"]
    })
    .then(donationSchedules => ({
      donationSchedules: donationSchedules.map(schedule => ({
        id: schedule.id,
        charityId: schedule.charityId,
        recurrence: schedule.recurrence,
        amount: Math.floor(schedule.amount),
        currency: schedule.currency,
        nextScheduledDonation: schedule.nextScheduledDonation.toString()
      })),
      charities: mapValues(grabAllCharities(donationSchedules), shortCharity)
    }))
    .then(success())
    .catch(error(res, 400));
};

type CreateDonationSchedule = PolygiveApi["/donation_schedules"]["POST"];
export const create: RTAuthedHandler<CreateDonationSchedule> = async (
  req,
  res
) => {
  const body = req.body;
  await ensureConnection();
  const donationSchedule = new DonationSchedule();
  donationSchedule.charityId = body.charityId;
  donationSchedule.userId = req.pgUser.id;
  donationSchedule.amount = Math.floor(req.body.amount);
  donationSchedule.recurrence = req.body.recurrence;
  donationSchedule.nextScheduledDonation = getNextDonationDate(
    new Date(),
    donationSchedule.recurrence
  ); // TODO: Change this to take into account donationRecurrence

  return getRepository(DonationSchedule)
    .save(donationSchedule)
    .then(async donationSchedule => {
      const charity = await getRepository(Charity).findOne({
        where: {
          id: donationSchedule.charityId
        }
      });
      return { donationSchedule, charity };
    })
    .then(({ donationSchedule, charity }) => ({
      id: donationSchedule.id,
      charityId: donationSchedule.id,
      recurrence: donationSchedule.recurrence,
      nextScheduledDonation: donationSchedule.nextScheduledDonation.toString(),
      amount: Math.floor(donationSchedule.amount),
      charity: shortCharity(charity)
    }))
    .then(success(res, 201))
    .catch(error());
};

type PatchDonationSchedule = PolygiveApi["/donation_schedules/:id"]["PATCH"];
export const patch: RTAuthedHandler<PatchDonationSchedule> = async (
  req,
  res
) => {
  const body = req.body;
  await ensureConnection();

  const dsRepository = getRepository(DonationSchedule);
  return dsRepository
    .findOneOrFail({
      where: {
        id: req.params.id
      }
    })
    .then(donationSchedule => {
      donationSchedule.charityId = body.charityId;
      donationSchedule.recurrence = body.recurrence;
      // For now, we don't allow nextScheduledDonation in the request.
      // Eventually, though, we will.
      // donationSchedule.nextScheduledDonation = body.nextScheduledDonation;
      donationSchedule.amount = Math.floor(body.amount);
      donationSchedule.currency = body.currency;
      return dsRepository.save(donationSchedule);
    })
    .then(async donationSchedule => {
      const charity = await getRepository(Charity).findOne({
        where: {
          id: donationSchedule.charityId
        }
      });
      return { donationSchedule, charity };
    })
    .then(({ donationSchedule, charity }) => ({
      id: donationSchedule.id,
      charityId: donationSchedule.charityId,
      recurrence: donationSchedule.recurrence,
      nextScheduledDonation: donationSchedule.nextScheduledDonation.toString(),
      amount: donationSchedule.amount,
      currency: donationSchedule.currency,
      charity: shortCharity(charity)
    }))
    .then(success(res, 201))
    .catch(error());
};

export default { list, create, patch };
