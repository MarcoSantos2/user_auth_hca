import { Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    ManyToOne, 
    JoinColumn,
    Unique
} from 'typeorm';
import { Company } from './Company';

@Entity('company_invitations')
@Unique(['company_uuid', 'invitee_email'])
export class CompanyInvitation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    invitee_email!: string;

    @Column()
    invitee_name!: string;

    @Column({ nullable: true })
    inviter_uuid!: string;

    @Column()
    company_uuid!: string;

    @Column()
    token!: string;

    @Column({ default: false })
    accepted!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @Column({ nullable: true })
    expires_at!: Date;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_uuid', referencedColumnName: 'uuid' })
    company!: Company;
}