import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  name: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  googleId: string;

  @Column()
  super: boolean;
}
