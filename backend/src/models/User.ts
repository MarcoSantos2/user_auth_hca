import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany, 
  JoinTable,
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Index, 
  Generated 
} from "typeorm";
import { Role } from "./Role";
import { GoogleAccount } from "./GoogleAccount";
import { Company } from "./Company";
import { Feedback } from "./Feedback";

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

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles!: Role[];

  @OneToMany(() => GoogleAccount, (google) => google.user)
  google_accounts!: GoogleAccount[];

  @ManyToMany(() => Company, (company) => company.users)
  @JoinTable()
  companies!: Company[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks!: Feedback[];

  @Column({ nullable: true })
  picture_url?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;

  @Column({ type: 'varchar', length: 6, nullable: true })
  reset_passkey!: string | null;

  @Column({ type: 'datetime', nullable: true })
  reset_passkey_exp!: Date | null;

  toJSON() {
    return {
      uuid: this.uuid,
      name: this.name,
      email: this.email,
      roles: this.roles
    }
  }
}
