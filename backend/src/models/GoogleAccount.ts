import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class GoogleAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  google_id!: string;

  @Column()
  email!: string;

  @ManyToOne(() => User, user => user.google_accounts)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
