import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    feedback_text!: string;

    @ManyToOne(() => User, user => user.feedbacks)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user!: User;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @DeleteDateColumn()
    deleted_at!: Date | null;
}