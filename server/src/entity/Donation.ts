import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import User from "./User";
import Charity from "./Charity";
import { Currency } from "../../shared/currency";

export enum DonationStatus {
  DRAFT = "DRAFT", // To the user, this hasn't been processed yet
  SUBMITTED = "SUBMITTED", // To the user, this is a completed donation
  PAID = "PAID", // The user's payment has processed
  FLUSHED = "FLUSHED" // We have sent out the charity
}

@Entity()
export default class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: change this to integers
  @Column("decimal", { precision: 11, scale: 2 })
  amount: number;

  @Column({
    type: "enum",
    enum: Currency,
    default: [Currency.USD]
  })
  currency: Currency;

  @Column()
  charityId: number;

  @ManyToOne(type => Charity)
  @JoinColumn()
  charity: Charity;

  @Column()
  userId: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({
    type: "enum",
    enum: DonationStatus,
    default: [DonationStatus.DRAFT]
  })
  status: DonationStatus;

  @CreateDateColumn({ type: "date" })
  donatedAt: Date;
}
