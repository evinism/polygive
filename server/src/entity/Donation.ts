
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

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

  @Column('int')
  charityId: number;

  @Column('int')
  userId: number;

  @Column({
    type: "enum",
    enum: DonationStatus,
    default: [DonationStatus.PENDING],
  })
  status: DonationStatus;
  
  @CreateDateColumn({type:'date'})
  donatedAt: Date;
}