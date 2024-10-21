import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";
import { Role } from "./Role";

@Entity()
export class UserCompanyRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.userCompanyRoles)
  user!: User;

  @ManyToOne(() => Company, company => company.userCompanyRoles)
  company!: Company;

  @ManyToOne(() => Role, role => role.userCompanyRoles)
  role!: Role;
}
