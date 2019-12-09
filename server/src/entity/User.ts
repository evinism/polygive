import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({nullable: true})
  googleId: string;

  @Column()
  super: boolean;
}
