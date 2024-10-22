import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  JoinTable,
  ManyToMany, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Index
} from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";
import { Company } from "./Company";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column()
  @Index({ unique: true })
  slug!: string;

  @ManyToMany(() => User, (user: User) => user.roles)
  users!: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions!: Permission[];

  @OneToMany(() => Company, (company) => company.role)
  companies!: Company[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;
}
