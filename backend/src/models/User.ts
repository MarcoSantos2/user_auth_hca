import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ unique: true })
  email: string = '';

  @Column()
  name: string = '';

  @Column()
  password: string = '';

  @Column({ default: false })
  verify: boolean = false;

  @Column()
  created_at: Date = new Date();

  @Column()
  updated_at: Date = new Date();

  @Column({ nullable: true })
  deleted_at: Date | null = null;
}
