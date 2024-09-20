import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class GooglePayload {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  google_id!: string;

  @Column()
  email!: string;

  @Column()
  sub!: string;

  @Column()
  user_id!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

