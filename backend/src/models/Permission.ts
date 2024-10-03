import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToMany, 
  JoinTable,
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  Index
} from "typeorm";
import { Role } from "./Role";

export enum AppScope {
  API = 'API',
  UI = 'UI'
}

export enum CategoryType {
  user = 'user',
  operation_staff = 'operation_staff',
  admin_staff = 'admin_staff',
  client = 'client',
  calendar = 'calendar',
  role = 'role',
  admin_group = 'admin_group',
  app_admin = 'app_admin', // App Administration - Our app internal staff use
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;
  
  @Column()
  @Index({ unique: true })
  slug!: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
    default: CategoryType.user
   })
  category_type!: CategoryType;

  @Column({
    type: 'enum',
    enum: AppScope,
    default: AppScope.UI
   })
  app_scope!: AppScope;

  @ManyToMany(() => Permission, (permission) => permission.sub_permissions)
  @JoinTable()
  sub_permissions!: Permission[];

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;
}
