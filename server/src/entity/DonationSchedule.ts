
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

export enum DonationRecurrence {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

@Entity()
export default class DonationSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 11, scale: 2 })
  amount: number;

  @Column('int')
  charityId: number;

  @Column('int')
  userId: number;

  @Column({
    type: "enum",
    enum: DonationRecurrence,
    default: [DonationRecurrence.MONTHLY],
  })
  recurrence: DonationRecurrence;

  /* This is a hint weird of a data model, but it's the simplest one I can come 
   * up with right now.
   *
   * First order operations:
   * 1. For daily, weekly, monthly, yearly, changing when in that 
   *    interval to send the donation.
   * 2. Disabling single occurrences of recurring donations, not implemented yet
   */
  @CreateDateColumn({type:'date'})
  anchorDate: Date;
}