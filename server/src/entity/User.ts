import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import PaymentConfiguration from "./PaymentConfiguration";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column()
  super: boolean;

  @Column({ nullable: true })
  paymentConfigurationId: number;

  @OneToOne(type => PaymentConfiguration, { nullable: true })
  @JoinColumn()
  user: PaymentConfiguration;
}
