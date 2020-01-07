import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import User from "./User";
import { Currency } from "../../shared/currency";

@Entity()
export default class PaymentConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Currency,
    default: [Currency.USD]
  })
  defaultCurrency: Currency;

  @Column()
  userId: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
