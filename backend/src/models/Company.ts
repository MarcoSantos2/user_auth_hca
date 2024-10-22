import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  ManyToMany 
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

  @Column({ type: 'varchar', length: 36 })
  userUuid!: string;

  @ManyToOne(() => User, user => user.companies, { nullable: false })
  user!: User; 

  @ManyToMany(() => User, (user) => user.companies)
  users!: User[];

  @ManyToOne(() => Role, (role) => role.companies, { nullable: false })
  role!: Role;
}
