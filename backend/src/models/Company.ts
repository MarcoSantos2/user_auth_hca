import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany 
} from "typeorm";
import { UserCompanyRole } from "./UserCompanyRole";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => UserCompanyRole, userCompanyRole => userCompanyRole.company)
  userCompanyRoles!: UserCompanyRole[];
}
