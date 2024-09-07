import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column()
  @Index({ unique: true })
  slug!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
