import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, Generated } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Private ID for internal use

  @Column()
  @Index({ unique: true })
  @Generated("uuid")
  uuid!: string;  // Public UUID for external use
  
  @Column()
  @Index({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  verify!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;

  toJSON() {
    return {
      uuid: this.uuid,
      name: this.name,
      email: this.email
    }
  }
}
