import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany, 
  JoinTable, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Index, 
  Generated 
} from "typeorm";
import { Role } from "./Role";

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

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: false })
  verify!: boolean;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  picture?: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles!: Role[];

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
      email: this.email,
      roles: this.roles
    }
  }
}
