
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Charity from './Charity';
import {Currency} from '../../shared/currency';

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

  @Column({
    type: "enum",
    enum: Currency,
    default: [Currency.USD]
  })
  currency: Currency

  @Column('int')
  charityId: number;

  @ManyToOne(type => Charity)
  @JoinColumn()
  charity: Charity;

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