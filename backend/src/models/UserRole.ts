import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Role, role => role.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
