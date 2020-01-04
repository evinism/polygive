import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Charity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
