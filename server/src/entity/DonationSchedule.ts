import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Charity from "./Charity";
import { Currency } from "../../shared/money";
import { DonationRecurrence } from "../../shared/entityRecords";

@Entity()
export default class DonationSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 11, scale: 2 })
  amount: number;

  @Column({
    type: "enum",
    enum: Currency,
    default: [Currency.USD]
  })
  currency: Currency;

  @Column("int")
  charityId: number;

  @ManyToOne(type => Charity)
  @JoinColumn()
  charity: Charity;

  @Column("int")
  userId: number;

  @Column({
    type: "enum",
    enum: DonationRecurrence,
    default: [DonationRecurrence.MONTHLY]
  })
  recurrence: DonationRecurrence;

  /* This is a hint weird of a data model, but it's the simplest one I can come
   * up with right now. This value represents when the next donation is
   * scheduled to take place. After update
   */
  @Column({
    type: "timestamp with time zone"
  })
  nextScheduledDonation: Date;
}
