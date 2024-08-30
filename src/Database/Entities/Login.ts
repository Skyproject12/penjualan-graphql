import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Login extends BaseEntity {

  @PrimaryGeneratedColumn()
  User!: number

  @Column()
  Password!: String
  
}