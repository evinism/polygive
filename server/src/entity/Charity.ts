import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Currency } from "../../shared/money";

@Entity()
export default class Charity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // TODO: Make category data more structured.
  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  score: number;

  @Column({
    type: "enum",
    enum: Currency,
    nullable: true
  })
  preferredCurrency: Currency;
}
