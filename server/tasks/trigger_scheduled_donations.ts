import ensureConnection from "../src/connection";
import DonationSchedule from "../src/entity/DonationSchedule";
import { getConnection, getRepository } from "typeorm";
import Donation, { DonationStatus } from "../src/entity/Donation";
import { getNextDonationDate } from "../src/util";

const scheduledTask = async () => {
  await ensureConnection();
  const schedules = await getConnection()
    .createQueryBuilder()
    .select("donation_schedule")
    .from(DonationSchedule, "donation_schedule")
    .where("donation_schedule.nextScheduledDonation < :date", {
      date: new Date()
    })
    .getMany();

  await Promise.all(
    schedules.map(async schedule => {
      // We should probably move this into the non-task code.
      // And also wrap it in a transaction
      const donation = new Donation();
      donation.charityId = schedule.charityId;
      donation.userId = schedule.userId;
      donation.amount = schedule.amount;
      donation.currency = schedule.currency;
      donation.status = DonationStatus.SUBMITTED;
      console.log(`Created donation for schedule id ${schedule.id}`);

      await getRepository(Donation).save(donation);
      schedule.nextScheduledDonation = getNextDonationDate(
        schedule.nextScheduledDonation,
        schedule.recurrence
      );
      console.log(`Updated schedule ${schedule.id}`);
      await getRepository(DonationSchedule).save(schedule);
    })
  );
  process.exit();
};

scheduledTask();
