
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import User from './User';
import Charity from "./Charity";

export enum DonationStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
}


@Entity()
export default class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 11, scale: 2 })
  amount: number;

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
    default: [DonationStatus.PENDING],
  })
  status: DonationStatus;
  
  @CreateDateColumn({type:'date'})
  donatedAt: Date;
}