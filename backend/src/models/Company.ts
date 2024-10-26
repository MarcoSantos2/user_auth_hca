import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToMany,
  Index,
  Generated,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column()
  @Index({ unique: true })
  @Generated("uuid")
  uuid!: string;  // Public UUID for external use

  @ManyToMany(() => User, (user) => user.companies)
  users!: User[];
  
  @OneToMany(() => Role, (role) => role.company)
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
      description: this.description,
    }
  }
}
